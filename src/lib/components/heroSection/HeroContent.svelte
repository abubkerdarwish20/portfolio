<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 100);
	});

	function splitWords(text: string) {
		return text.split(' ').map((word, i) => ({ word, i }));
	}

	const introWords = splitWords('Hey, I am Abubker Darwish');
</script>

<div class="flex flex-col items-start space-y-8">
	<div class="space-y-4">
		<p class=" text-lg font-medium tracking-wide sm:text-xl flex flex-wrap gap-x-[0.3em] h-7">
			{#each introWords as { word, i } (i)}
				<span
					class="from-gray-900 to-gray-900 bg-linear-to-r text-transparent bg-clip-text dark:from-white dark:to-white inline-block transition-all duration-700 {mounted
						? 'translate-y-0 opacity-100'
						: 'translate-y-4 opacity-0'}"
					style="transition-delay: {i * 100}ms"
				>
					{#if word === 'Abubker' || word === 'Darwish'}
						<span class="font-bold text-brand-primary">{word}</span>
					{:else}
						{word}
					{/if}
				</span>
			{/each}
		</p>

		<h1 class="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
			<span
				class="from-gray-900 to-gray-900 bg-linear-to-r text-transparent bg-clip-text dark:from-white dark:to-white inline-block transition-all duration-1000 delay-700 {mounted
					? 'translate-y-0 opacity-100'
					: 'translate-y-8 opacity-0'}"
			>
				Frontend
			</span>
			<span
				class="from-gray-900 to-gray-500 bg-linear-to-r bg-clip-text text-transparent dark:from-white dark:to-gray-400 inline-block transition-all duration-1000 delay-1000 {mounted
					? 'translate-y-0 opacity-100'
					: 'translate-y-8 opacity-0'}"
			>
				Developer
			</span>
		</h1>

		<p
			class="max-w-lg text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400 transition-all duration-1000 delay-1300 {mounted
				? 'translate-y-0 opacity-100'
				: 'translate-y-4 opacity-0'}"
		>
			I craft user-friendly and aesthetic digital experiences. With a passion for clean code and
			modern design, I turn complex problems into elegant solutions.
		</p>
	</div>

	<div
		class="flex items-center gap-4 transition-all duration-1000 delay-1600 {mounted
			? 'translate-y-0 opacity-100'
			: 'translate-y-4 opacity-0'}"
	>
		<a
			class="bg-brand-primary shadow-brand-primary/20 hover:bg-orange-700 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
			href="#contact"
		>
			Hire me
		</a>
	</div>

	<div
		class="mt-12 hidden w-full max-w-md sm:block transition-all duration-1000 delay-1900 {mounted
			? 'translate-y-0 opacity-100'
			: 'translate-y-8 opacity-0'}"
	>
		<div
			class="glass-card animate-float-delayed relative overflow-hidden rounded-2xl p-6 shadow-md"
		>
			<span
				class="text-brand-primary absolute top-4 left-4 font-serif text-6xl opacity-20 leading-none"
				>“</span
			>
			<div class="relative z-10 space-y-4 pl-2">
				<p class="pt-2 text-sm italic leading-relaxed text-gray-600 dark:text-gray-300">
					Abubker's ability to translate our vision into a stunning website was incredible. His
					attention to detail and technical skills are top-notch. Highly recommended!
				</p>
				<div class="flex items-center gap-3 pt-2">
					<img
						alt="Client Portrait"
						class="border-brand-primary/30 h-10 w-10 rounded-full border-2 object-cover"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0Ke7AK9UIRfAjHuMa9utC_y-tqqLBTboTWikqSnjr7SUoSlIyAaDQrwXHQc8uJ5Xh99IwclUOxZSvGiKbXUt8frjG4aCVZOFI-12Ys-1FA-XMJdfUtd4LF76MGjdStm0nonAupAczN2ATMQJfxzggeBNOoOZHZqMtVY7sPBpjhmOEaEVmKI6RWDd1OH9zr0QUDKla3VxjcG9BiOBDEJYnm00S5AMaCiQVvnlaOqXZw9OSxXGnAQaLGTmzag0wUHiblQIpYY4jIoQ"
					/>
					<div>
						<h4 class="text-sm font-semibold text-gray-900 dark:text-white">Carolina Abott</h4>
						<p class="text-xs text-gray-500 dark:text-gray-400">Business Owner</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Standard float animation for testimonial */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
	.animate-float-delayed {
		animation: float 6s ease-in-out infinite;
	}
</style>
