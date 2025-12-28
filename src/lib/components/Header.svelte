<script lang="ts">
	import { onMount } from 'svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let isMenuOpen = $state(false);
	let activeSection = $state('home');

	const navItems = [
		{ label: 'Home', href: '#home', id: 'home' },
		{ label: 'Skills', href: '#skills', id: 'skills' },
		{ label: 'Experience', href: '#experience', id: 'experience' },
		// { label: 'Projects', href: '#projects', id: 'projects' },
		{ label: 'Connect', href: '#contact', id: 'contact' }
	];

	onMount(() => {
		const observerOptions = {
			root: null,
			rootMargin: '-50% 0px -50% 0px',
			threshold: 0
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeSection = entry.target.id;
				}
			});
		}, observerOptions);

		const sections = document.querySelectorAll('section[id]');
		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	});
</script>

<header class="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
	<nav
		class="flex w-full max-w-7xl items-center justify-between glass-nav backdrop-blur-sm px-2 py-1 md:px-4 lg:px-6 rounded-full shadow-sm"
	>
		<a
			href="/"
			class="flex items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
		>
			Abubker<span class="text-brand-primary">.</span>
		</a>
		<div class="hidden items-center gap-1 p-1.5 md:flex">
			{#each navItems as item (item.id)}
				<a
					class="rounded-full px-6 py-2 text-sm font-medium transition-all {activeSection ===
					item.id
						? 'bg-brand-primary text-white shadow-md'
						: 'text-gray-600 hover:text-brand-primary dark:text-gray-300 dark:hover:text-white'}"
					href={item.href}>{item.label}</a
				>
			{/each}
		</div>
		<div class="flex items-center gap-3">
			<div class="flex items-center gap-3">
				<a
					class="h-9 group hidden items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-white shadow-md transition-all duration-300 hover:shadow-lg sm:flex"
					href="/abubker-darwish-cv.pdf"
					download="abubker-darwish-cv.pdf"
				>
					<span class="material-icons-outlined text-white transition-colors">download</span>
					<span class="text-sm font-medium text-white transition-colors">Download Resume</span>
				</a>
				<ThemeToggle />
			</div>

			<button
				onclick={() => (isMenuOpen = !isMenuOpen)}
				class="md:hidden h-9 w-9 cursor-pointer flex items-center justify-center rounded-full border border-gray-200 bg-white/80 p-2 text-gray-800 shadow-sm transition-transform hover:scale-105 dark:border-white/10 dark:bg-black/40 dark:text-white"
				aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
			>
				<span class="material-icons-outlined text-3xl" aria-hidden="true"
					>{isMenuOpen ? 'close' : 'menu'}</span
				>
			</button>
		</div>
	</nav>

	{#if isMenuOpen}
		<div
			class="glass-nav absolute top-24 left-4 right-4 flex flex-col gap-4 rounded-2xl p-6 shadow-xl md:hidden dark:bg-black/80"
		>
			{#each navItems as item (item.id)}
				<a
					class="text-lg font-medium {activeSection === item.id
						? 'text-brand-primary'
						: 'text-gray-900 dark:text-white'}"
					href={item.href}
					onclick={() => (isMenuOpen = false)}>{item.label}</a
				>
			{/each}
		</div>
	{/if}
</header>
