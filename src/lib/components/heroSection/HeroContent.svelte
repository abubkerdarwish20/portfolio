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

	const cards = [
		{
			id: 1,
			content:
				'A highly accomplished Senior Developer with excellent technical judgment and a deep understanding of modern development practices. He consistently delivers scalable, well-architected solutions while maintaining a strong focus on business requirements and user experience. He goes beyond implementation to improve performance, code quality, and overall product value.',
			author: 'Ahmed Ba Haggag',
			role: 'Team Lead Engineer at Jisr',
			link: 'https://www.linkedin.com/in/ahmedbahaggag/',
			avatar: 'https://ca.slack-edge.com/T9VCZ4Q69-UADMVUCTZ-ce23b9c589c7-512'
		},
		{
			id: 2,
			content:
				'A highly skilled developer who consistently delivers high-quality code. The project was completed on time and exceeded our expectations in terms of performance.',
			author: 'Marcus Chen',
			role: 'Tech Lead',
			avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
		}
	];

	let activeIndex = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			activeIndex = (activeIndex + 1) % cards.length;
		}, 6000);
		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-col items-start space-y-8">
	<div class="space-y-4">
		<p class="h-7 flex flex-wrap gap-x-[0.3em] text-lg font-medium tracking-wide sm:text-xl">
			{#each introWords as { word, i } (i)}
				<span
					class="inline-block transition-all duration-700 bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-900 dark:from-white dark:to-white {mounted
						? 'translate-y-0 opacity-100'
						: 'translate-y-4 opacity-0'}"
					style="transition-delay: {i * 100}ms"
				>
					{#if word === 'Abubker' || word === 'Darwish'}
						<span class="text-brand-primary font-bold">{word}</span>
					{:else}
						{word}
					{/if}
				</span>
			{/each}
		</p>

		<h1 class="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
			<span
				class="inline-block transition-all duration-1000 delay-700 bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-900 dark:from-white dark:to-white {mounted
					? 'translate-y-0 opacity-100'
					: 'translate-y-8 opacity-0'}"
			>
				Frontend
			</span>
			<span
				class="inline-block transition-all duration-1000 delay-1000 bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 {mounted
					? 'translate-y-0 opacity-100'
					: 'translate-y-8 opacity-0'}"
			>
				Developer
			</span>
		</h1>

		<p
			class="max-w-lg text-base leading-relaxed text-gray-600 transition-all duration-1000 delay-1300 md:text-lg dark:text-gray-400 {mounted
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
			class="bg-brand-primary shadow-brand-primary/20 hover:bg-orange-700 transform rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
			href="#contact"
		>
			Contact me
		</a>
	</div>

	<div
		class="relative mt-12 hidden w-full max-w-md sm:grid grid-cols-1 grid-rows-1 transition-all duration-1000 delay-1900 {mounted
			? 'translate-y-0 opacity-100'
			: 'translate-y-8 opacity-0'}"
	>
		{#each cards as card, i (card.id)}
			{@const isActive = i === activeIndex}
			<div
				class="glass-card col-start-1 row-start-1 rounded-2xl p-6 shadow-md transition-all duration-1000 transform"
				class:z-20={isActive}
				class:opacity-100={isActive}
				class:translate-y-0={isActive}
				class:scale-100={isActive}
				class:z-10={!isActive}
				class:opacity-0={!isActive}
				class:pointer-events-none={!isActive}
				class:translate-y-8={!isActive}
				class:scale-95={!isActive}
			>
				<span
					class="text-brand-primary absolute top-4 left-4 font-serif text-6xl leading-none opacity-20"
					>“</span
				>
				<div class="h-full relative z-10 space-y-4 pl-2 flex flex-col justify-between">
					<p class="flex-1 pt-2 text-sm italic leading-relaxed text-gray-600 dark:text-gray-300">
						{card.content}
					</p>
					<div class="flex items-center gap-3 pt-2 mt-auto">
						<img
							alt={card.author}
							class="border-brand-primary/30 h-10 w-10 rounded-full border-2 object-cover"
							src={card.avatar}
						/>
						<div>
							<a
								href={card.link}
								target="_blank"
								rel="noopener noreferrer"
								class="text-sm font-semibold text-gray-900 dark:text-white">{card.author}</a
							>
							<p class="text-xs text-gray-500 dark:text-gray-400">{card.role}</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.glass-card {
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	:global(.dark) .glass-card {
		background: rgba(30, 30, 30, 0.7);
		border-color: rgba(255, 255, 255, 0.05);
	}
</style>
