<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import {
		ChefHatIcon,
		ShoppingBag01Icon,
		DashboardSquare01Icon,
		Film01Icon,
		CodeIcon,
		ArrowUpRight01Icon
	} from '@hugeicons/core-free-icons';

	const projects = [
		{
			title: 'Recipe Finder',
			category: 'Web Application',
			description:
				'Search and discover recipes from around the world. Save favorites and get detailed cooking instructions in a beautiful, responsive interface.',
			tags: ['React', 'TailwindCSS', 'API Integration'],
			icon: ChefHatIcon,
			accent: 'brand-primary',
			github: '#',
			live: '#'
		},
		{
			title: 'Modern Shop',
			category: 'E-Commerce',
			description:
				'A full-featured e-commerce platform with cart functionality, user authentication, and stripe payment integration designed for high conversion.',
			tags: ['Next.js', 'Stripe', 'TypeScript'],
			icon: ShoppingBag01Icon,
			accent: 'blue-500',
			github: '#',
			live: '#'
		},
		{
			title: 'Analytics Pro',
			category: 'SaaS Dashboard',
			description:
				'A comprehensive analytics dashboard for SaaS businesses, featuring data visualization charts, real-time updates, and reporting tools.',
			tags: ['Vue.js', 'Chart.js', 'Firebase'],
			icon: DashboardSquare01Icon,
			accent: 'green-500',
			github: '#',
			live: '#'
		},
		{
			title: 'StreamHub',
			category: 'Entertainment',
			description:
				'A movie and TV show discovery app using the TMDB API. Browse trending content, watch trailers, and manage your watchlist effortlessly.',
			tags: ['React Native', 'Redux', 'API'],
			icon: Film01Icon,
			accent: 'purple-500',
			github: '#',
			live: '#'
		}
	];
</script>

<section
	class="scroll-m-16 scroll-section relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark"
	id="projects"
>
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16 space-y-4">
			<h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
				Featured <span class="text-brand-primary">Projects</span>
			</h2>
			<p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
				Check out some of the recent projects I've worked on, showcasing my skills in web
				development and design.
			</p>
		</div>

		<div
			class="flex overflow-x-auto gap-6 lg:gap-8 pb-10 snap-x snap-mandatory custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
		>
			{#each projects as project (project.title)}
				<div
					class="w-[85vw] sm:w-[480px] lg:w-[600px] xl:w-[700px] shrink-0 snap-center bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl hover:border-brand-primary/20 dark:hover:border-brand-primary/20 transition-all duration-300 group flex flex-col"
				>
					<div class="flex flex-col xl:flex-row gap-8 h-full">
						<div
							class="w-full xl:w-1/2 aspect-square xl:aspect-auto rounded-xl bg-gray-100 dark:bg-black/30 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-50 dark:group-hover:bg-black/40 transition-colors"
						>
							<div
								class="absolute inset-0 bg-linear-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
							></div>
							<HugeiconsIcon
								icon={project.icon}
								size={64}
								className="text-gray-300 dark:text-gray-700 group-hover:text-brand-primary/50 transition-colors duration-300 transform group-hover:scale-110"
							/>
						</div>

						<div class="w-full xl:w-1/2 flex flex-col justify-between space-y-4">
							<div class="space-y-3">
								<span
									class="text-xs font-bold tracking-wider uppercase"
									style="color: var(--color-{project.accent}, {project.accent})"
								>
									{project.category}
								</span>
								<h3
									class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-brand-primary transition-colors"
								>
									{project.title}
								</h3>
								<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
									{project.description}
								</p>
								<div class="flex flex-wrap gap-2 pt-2">
									{#each project.tags as tag (tag)}
										<span
											class="px-3 py-1 rounded-md bg-gray-100 dark:bg-white/5 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/5"
										>
											{tag}
										</span>
									{/each}
								</div>
							</div>

							<div class="flex items-center gap-4 pt-4 mt-auto">
								<a
									class="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:bg-brand-primary dark:hover:bg-brand-primary hover:text-white dark:hover:text-white transition-all shadow-lg shadow-gray-200 dark:shadow-none"
									href={project.github}
								>
									<HugeiconsIcon icon={CodeIcon} size={18} />
									Github Repo
								</a>
								<a
									class="flex items-center gap-2 px-4 py-2.5 rounded-full text-gray-600 dark:text-gray-300 text-sm font-medium hover:text-brand-primary dark:hover:text-brand-primary transition-colors"
									href={project.live}
								>
									<HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
									Live Demo
								</a>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
