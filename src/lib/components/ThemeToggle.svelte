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

<button
	onclick={toggleTheme}
	class="cursor-pointer flex items-center justify-center rounded-full border border-gray-200 bg-white/80 p-2 text-gray-800 shadow-sm backdrop-blur-sm transition-transform hover:scale-105 dark:border-white/10 dark:bg-black/40 dark:text-white"
	aria-label="Toggle dark mode"
>
	{#if isDark}
		<span class="material-icons-outlined text-xl">light_mode</span>
	{:else}
		<span class="material-icons-outlined text-xl">dark_mode</span>
	{/if}
</button>
