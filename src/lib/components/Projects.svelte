<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import {
		GithubIcon,
		ArrowLeft01Icon,
		ArrowRight01Icon,
		LiveStreaming02Icon
	} from '@hugeicons/core-free-icons';

	const projects = [
		{
			title: 'React DS',
			category: 'React Package',
			description:
				'A modern, lightweight design system for React applications, featuring customizable components and Tailwind CSS integration.',
			tags: ['React', 'TailwindCSS', 'storybook', 'TypeScript'],
			image: '/ds.png',
			accent: 'brand-primary',
			github: 'https://github.com/abubkerdarwish20/react-ds',
			live: 'https://react-ds-001.netlify.app/'
		},
		{
			title: 'Image Bluray',
			category: 'Next.js App',
			description:
				'An ultra-fast image gallery built with Next.js and Unsplash API, featuring intelligent blurring and stripe integration.',
			tags: ['Next.js', 'TypeScript'],
			image: '/upslashy.png',
			accent: 'blue-500',
			github: 'https://github.com/abubkerdarwish20/image-bluray',
			live: 'https://image-bluray.netlify.app/'
		}
	];

	let currentIndex = 0;

	function next() {
		currentIndex = (currentIndex + 1) % projects.length;
	}

	function prev() {
		currentIndex = (currentIndex - 1 + projects.length) % projects.length;
	}

	function goTo(index: number) {
		currentIndex = index;
	}
</script>

<section
	class="scroll-m-16 scroll-section relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark overflow-hidden"
	id="projects"
>
	<div class="max-w-7xl mx-auto relative">
		<div class="text-center mb-16 space-y-4">
			<h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
				Featured <span class="text-brand-primary">Projects</span>
			</h2>
			<p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
				Check out some of the recent projects I've worked on, showcasing my skills in web
				development.
			</p>
		</div>

		<!-- Carousel Container -->
		<div class="relative group/carousel">
			<!-- Slider -->
			<div class="overflow-visible px-4 sm:px-0">
				<div
					class="flex carousel-slider transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
					style="transform: translateX(calc(-{currentIndex} * (var(--card-width) + var(--card-gap))))"
				>
					{#each projects as project, i (project.title)}
						<div
							class="w-full sm:w-[500px] lg:w-[600px] xl:w-[700px] shrink-0 bg-white dark:bg-dark-card rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col {currentIndex ===
							i
								? 'opacity-100 scale-100'
								: 'opacity-40 scale-95 md:scale-90 blur-[1px]'}"
						>
							<div class="flex flex-col xl:flex-row gap-8 h-full">
								<div
									class="w-full xl:w-1/2 aspect-video xl:aspect-square rounded-2xl bg-gray-100 dark:bg-black/30 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-50 dark:group-hover:bg-black/40 transition-colors"
								>
									<div
										class="absolute inset-0 bg-linear-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
									></div>
									<img
										src={project.image}
										alt={project.title}
										class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</div>

								<div class="w-full xl:w-1/2 flex flex-col justify-between">
									<div class="space-y-4">
										<div>
											<span
												class="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 mb-3 inline-block"
												style="color: var(--color-{project.accent}, {project.accent})"
											>
												{project.category}
											</span>
											<h3
												class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-brand-primary transition-colors"
											>
												{project.title}
											</h3>
										</div>

										<p class="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
											{project.description}
										</p>
										<div class="flex flex-wrap gap-2 pt-2">
											{#each project.tags as tag (tag)}
												<span
													class="px-3 py-1 rounded-lg bg-gray-50 dark:bg-white/5 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-white/5"
												>
													{tag}
												</span>
											{/each}
										</div>
									</div>

									<div class="flex items-center gap-4 pt-8">
										<a
											class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold hover:bg-brand-primary dark:hover:bg-brand-primary hover:text-white dark:hover:text-white transition-all shadow-lg shadow-gray-200 dark:shadow-none"
											href={project.github}
											target="_blank"
										>
											<HugeiconsIcon icon={GithubIcon} size={20} />
											Github
										</a>
										<a
											class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/5 hover:text-brand-primary dark:hover:text-brand-primary transition-all"
											href={project.live}
											target="_blank"
										>
											<HugeiconsIcon icon={LiveStreaming02Icon} size={20} />
											Demo
										</a>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Navigation Buttons -->
			<div class="flex items-center justify-between mt-12 px-4 max-w-4xl mx-auto">
				<div class="flex gap-4">
					<button
						on:click={prev}
						class="cursor-pointer p-4 rounded-full bg-white dark:bg-dark-card border border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary hover:border-brand-primary/30 transition-all shadow-lg shadow-gray-100 dark:shadow-none active:scale-95"
						aria-label="Previous project"
					>
						<HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
					</button>
					<button
						on:click={next}
						class="cursor-pointer p-4 rounded-full bg-white dark:bg-dark-card border border-gray-100 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary hover:border-brand-primary/30 transition-all shadow-lg shadow-gray-100 dark:shadow-none active:scale-95"
						aria-label="Next project"
					>
						<HugeiconsIcon icon={ArrowRight01Icon} size={24} />
					</button>
				</div>

				<!-- Indicators -->
				<div class="flex gap-3">
					{#each projects as project, i (project.title)}
						<button
							on:click={() => goTo(i)}
							class="cursor-pointer h-2 transition-all duration-300 rounded-full {currentIndex === i
								? 'w-12 bg-brand-primary'
								: 'w-2 bg-gray-300 dark:bg-white/10 hover:bg-brand-primary/40'}"
							aria-label="Go to project {i + 1}"
						></button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Hide horizontal scrollbar if any */
	div {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	div::-webkit-scrollbar {
		display: none;
	}

	.carousel-slider {
		--card-width: 100%;
		--card-gap: 1.5rem;
		gap: var(--card-gap);
	}

	@media (min-width: 640px) {
		.carousel-slider {
			--card-width: 500px;
		}
	}

	@media (min-width: 1024px) {
		.carousel-slider {
			--card-width: 600px;
			--card-gap: 2rem;
		}
	}

	@media (min-width: 1280px) {
		.carousel-slider {
			--card-width: 700px;
		}
	}
</style>
