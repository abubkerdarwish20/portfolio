<script lang="ts">
	import { onMount } from 'svelte';

	let isDark = $state(false);

	onMount(() => {
		isDark =
			localStorage.getItem('theme') === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
		updateTheme();
	});

	function toggleTheme() {
		isDark = !isDark;
		updateTheme();
	}

	function updateTheme() {
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}
</script>

<div class="fixed bottom-6 right-6 z-50">
	<button
		onclick={toggleTheme}
		class="flex items-center justify-center rounded-full border border-gray-200 bg-white p-3 text-gray-800 shadow-lg transition-transform hover:scale-110 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
		aria-label="Toggle dark mode"
	>
		{#if isDark}
			<span class="material-icons-outlined">light_mode</span>
		{:else}
			<span class="material-icons-outlined">dark_mode</span>
		{/if}
	</button>
</div>
