import svelteLintConfig from '@sveltejs/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...svelteLintConfig,
	{
		rules: {
			'no-console': 'warn',
			'@typescript-eslint/no-empty-object-type': 'off',
			'svelte/no-navigation-without-resolve': 'off',
			'@stylistic/quotes': ['error', 'single']
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', 'node_modules/']
	}
];
