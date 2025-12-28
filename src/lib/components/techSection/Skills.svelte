<script lang="ts">
	const skills = [
		{
			name: 'HTML5',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
		},
		{
			name: 'CSS3',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
		},
		{
			name: 'JavaScript',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
		},
		{
			name: 'TypeScript',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
		},
		{
			name: 'React',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
		},
		{
			name: 'Vue',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
		},
		{
			name: 'Svelte',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg'
		},
		{
			name: 'Next.js',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
		},
		{
			name: 'Node.js',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
		},
		{
			name: 'Express',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'
		},
		{
			name: 'MongoDB',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
		},
		{
			name: 'Firebase',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg'
		},
		{
			name: 'Tailwind',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
		},
		{
			name: 'Vitest',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitest/vitest-original.svg'
		},
		{
			name: 'Git',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
		},
		{
			name: 'Figma',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
		}
	];
</script>

<section
	class="scroll-section !scroll-m-48 relative z-10 py-12 md:py-24 overflow-hidden bg-linear-to-b from-transparent to-gray-50 dark:to-white/5"
	id="skills"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-16">
		<div class="text-center space-y-4">
			<h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
				Technical <span class="text-brand-primary">Skills</span>
			</h2>
			<p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
				I leverage a comprehensive stack of modern tools and frameworks to build scalable,
				high-performance web applications.
			</p>
		</div>
	</div>

	<!-- Infinite Scroll Container -->
	<div class=" relative flex overflow-hidden py-10">
		<div class="flex animate-infinite-scroll gap-5 sm:gap-10 whitespace-nowrap">
			{#each [1, 2, 3] as i (i)}
				<div class="flex gap-5 sm:gap-10 items-center">
					{#each skills as skill (skill.name + i)}
						<div class="group flex items-center gap-3">
							<div
								title={skill.name}
								class="w-14 h-14 sm:w-16 sm:h-16 relative flex items-center justify-center rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#1E1E1E] shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:scale-110 group-hover:-translate-y-1"
							>
								<img
									alt={skill.name}
									class="w-8 h-8 sm:w-10 sm:h-10 object-contain"
									src={skill.icon}
								/>
							</div>
							<!-- <span
								class="text-lg font-bold text-gray-700 dark:text-gray-300 group-hover:text-brand-primary transition-colors duration-300"
							>
								{skill.name}
							</span> -->
						</div>
					{/each}
				</div>
			{/each}
		</div>

		<!-- Gradient Overlays for smooth entry/exit -->
		<div
			class="absolute inset-y-0 left-0 w-24 sm:w-48 bg-linear-to-r from-white dark:from-[#0f1115] to-transparent z-10 pointer-events-none"
		></div>
		<div
			class="absolute inset-y-0 right-0 w-24 sm:w-48 bg-linear-to-l from-white dark:from-[#0f1115] to-transparent z-10 pointer-events-none"
		></div>
	</div>
</section>

<style>
	@keyframes infinite-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.animate-infinite-scroll {
		animation: infinite-scroll 40s linear infinite;
		width: max-content;
	}

	/* Pause on hover for better accessibility */
	.animate-infinite-scroll:hover {
		animation-play-state: paused;
	}
</style>
