import {defineConfig, build} from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import process from 'node:process';
import zipPack from 'vite-plugin-zip-pack';
import checker from 'vite-plugin-checker';
import clean from 'vite-plugin-clean';
import WextManifest from 'vite-plugin-wext-manifest';

import type {Plugin} from 'vite';

// Custom plugin to build scripts as IIFE (self-contained, no ES module imports)
// Used for scripts that can't use ES modules (e.g., content scripts injected via manifest)
function buildIIFEScripts(options: {
  scripts: {name: string; entry: string}[];
  outDir: string;
  isDevelopment: boolean;
}): Plugin {
  return {
    name: 'build-iife-scripts',
    async writeBundle() {
      for (const script of options.scripts) {
        await build({
          configFile: false,
          build: {
            write: true,
            outDir: options.outDir,
            emptyOutDir: false,
            sourcemap: options.isDevelopment ? 'inline' : false,
            minify: !options.isDevelopment,
            rollupOptions: {
              input: script.entry,
              output: {
                entryFileNames: `assets/js/${script.name}.bundle.js`,
                format: 'iife',
                inlineDynamicImports: true,
              },
            },
            lib: {
              entry: script.entry,
              formats: ['iife'],
              name: script.name,
            },
          },
        });
      }
    },
  };
}

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
			}) as Plugin,

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

			// Build scripts as IIFE (no ES module imports)
			// Content scripts can't use ES modules when injected via manifest
			buildIIFEScripts({
				scripts: [
					{
						name: 'contentScript',
						entry: path.resolve(sourcePath, 'ContentScript/index.ts'),
					},
				],
				outDir: getOutDir(),
				isDevelopment,
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
					// Background script (service worker in Chrome, background script in Firefox)
					// Both MV3 implementations support ES modules
					background: path.resolve(sourcePath, 'Background/index.ts'),
					// Note: contentScript is built separately as IIFE via buildIIFEScripts plugin
				},

				output: {
					entryFileNames: 'assets/js/[name].bundle.js',
					assetFileNames: (assetInfo) => {
						if (assetInfo.names?.[0]?.match(/\.(css|s[ac]ss|less)$/)) {
							return 'assets/css/[name]-[hash].css';
						}
						return 'assets/[name]-[hash].[ext]';
					},
					chunkFileNames: 'assets/js/[name]-[hash].chunk.js',
				},
			},

		},

		// esbuild options - drop console/debugger in production
		esbuild: mode === 'production' ? {
			drop: ['console', 'debugger'],
		} : {},
	};
});
