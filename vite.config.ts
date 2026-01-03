import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import process from 'node:process';
import zipPack from 'vite-plugin-zip-pack';
import checker from 'vite-plugin-checker';
import clean from 'vite-plugin-clean';
import WextManifest from 'vite-plugin-wext-manifest';

export default defineConfig(({ mode }) => {
	const isDevelopment = mode !== 'production';
	const sourcePath = path.resolve(__dirname, 'source');
	const destPath = path.resolve(__dirname, 'extension');
	const targetBrowser = process.env.TARGET_BROWSER || 'chrome';

	const getOutDir = () => path.resolve(destPath, targetBrowser);

	const getExtensionZipFileName = () => {
		switch (targetBrowser) {
			case 'opera': {
				return `${targetBrowser}.crx`;
			}

			case 'firefox': {
				return `${targetBrowser}.xpi`;
			}

			default: {
				return `${targetBrowser}.zip`;
			}
		}
	};

	return {
		root: sourcePath,

		publicDir: path.resolve(sourcePath, 'public'),

		resolve: {
			alias: {
				'@': path.resolve(sourcePath),
				'~': path.resolve(__dirname, 'node_modules'),
			},
		},

		define: {
			__DEV__: isDevelopment,
			__TARGET_BROWSER__: JSON.stringify(targetBrowser),
		},

		plugins: [
			react(),

			// delete previous built compressed file
			clean({
				targetFiles: [path.resolve(destPath, getExtensionZipFileName())],
			}),

			// Run typescript checker in worker thread
			checker({
				typescript: {
					tsconfigPath: './tsconfig.json',
				},
			}),

			// Generate manifest.json for the browser
			WextManifest({
				manifestPath: 'manifest.json',
				usePackageJSONVersion: true,
			}),

			!isDevelopment &&
				zipPack({
					inDir: getOutDir(),
					outDir: destPath,
					outFileName: getExtensionZipFileName(),
					enableLogging: true,
				}),
		],

		build: {
			outDir: getOutDir(),

			emptyOutDir: !isDevelopment,

			sourcemap: isDevelopment ? 'inline' : false,

			minify: mode === 'production',

			rollupOptions: {
				input: {
					// For UI pages, use the HTML file as the entry.
					// Vite will find the <script> tag inside and bundle it.
					popup: path.resolve(sourcePath, 'Popup/popup.html'),
					options: path.resolve(sourcePath, 'Options/options.html'),
					// For script-only parts, use the TS file directly.
					background: path.resolve(sourcePath, 'Background/index.ts'),
					contentScript: path.resolve(sourcePath, 'ContentScript/index.ts'),
				},

				output: {
					// For main entry scripts (background, contentScript, etc.)
					entryFileNames: 'assets/js/[name].bundle.js',

					// For other assets like CSS
					assetFileNames: (assetInfo) => {
						if (
							!!assetInfo.name &&
							/\.(css|s[ac]ss|less)$/.test(assetInfo.name)
						) {
							return 'assets/css/[name]-[hash].css';
						}

						// For other assets like fonts or images
						return 'assets/[name]-[hash].[ext]';
					},

					// For code-split chunks (if any)
					chunkFileNames: 'assets/js/[name]-[hash].chunk.js',
				},
			},

			terserOptions: {
				mangle: true,
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
				format: {
					comments: false,
				},
			},
		},
	};
});
