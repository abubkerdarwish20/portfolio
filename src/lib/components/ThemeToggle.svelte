<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Sun02Icon, Moon02Icon } from '@hugeicons/core-free-icons';

	let isDark = $state(false);

	onMount(() => {
		isDark =
			localStorage.getItem('theme') === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
		updateTheme();
	});

	function updateTheme() {
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}

	// The new theme spreads out as a circle from the button (View Transitions API);
	// browsers without it, or reduced-motion users, get an instant switch
	async function toggleTheme(e: MouseEvent) {
		const flip = async () => {
			isDark = !isDark;
			updateTheme();
			await tick();
		};
		if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
			flip();
			return;
		}
		const x = e.clientX;
		const y = e.clientY;
		const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
		const transition = document.startViewTransition(flip);
		await transition.ready;
		document.documentElement.animate(
			{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
			{
				duration: 650,
				easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
				pseudoElement: '::view-transition-new(root)'
			}
		);
	}
</script>

<button
	onclick={toggleTheme}
	class="toggle grid h-9 w-9 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full border border-gray-200 bg-white/80 text-gray-800 shadow-sm backdrop-blur-sm transition-transform hover:scale-105 dark:border-white/10 dark:bg-black/40 dark:text-white"
	aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{#key isDark}
		<span class="icon col-start-1 row-start-1">
			<HugeiconsIcon icon={isDark ? Sun02Icon : Moon02Icon} size={18} />
		</span>
	{/key}
</button>

<style>
	.icon {
		animation: spin-in 0.5s var(--ease-out-expo);
	}
	@keyframes spin-in {
		from {
			transform: rotate(-90deg) scale(0.4);
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.icon {
			animation: none;
		}
	}
</style>
