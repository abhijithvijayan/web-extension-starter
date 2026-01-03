import nodeConfig from '@abhijithvijayan/eslint-config/node';
import tsConfig from '@abhijithvijayan/eslint-config/typescript';
import reactConfig from '@abhijithvijayan/eslint-config/react';

export default [
	{
		ignores: [
			'node_modules/**',
			'extension/**',
			'*.js',
			'*.mjs',
			'vite.config.ts',
		],
	},
	...nodeConfig({
		files: ['**/*.ts', '**/*.tsx'],
	}),
	...tsConfig({
		files: ['**/*.ts', '**/*.tsx'],
	}),
	...reactConfig({
		files: ['**/*.tsx'],
	}),
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			'no-console': 'off',
			'@typescript-eslint/no-use-before-define': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
			// Disable due to resolver issues in ESM
			'import-x/no-duplicates': 'off',
		},
	},
	{
		files: ['**/*.tsx'],
		rules: {
			'react/jsx-props-no-spreading': 'off',
			'react/react-in-jsx-scope': 'off',
			'jsx-a11y/label-has-associated-control': 'off',
		},
	},
];
