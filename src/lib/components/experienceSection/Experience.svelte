<script lang="ts">
	const experiences = [
		{
			role: 'Front-end Engineer',
			company: 'Jisr HR',
			period: 'May 2019 - Present',
			description:
				'Led a team of developers in designing and implementing highly scalable and performant web applications using React.js. Developing and maintaining core product services while ensuring high-quality software solutions.',
			highlights: [
				'Developed and maintained reusable components and libraries for efficient UI implementation.',
				'Implemented responsive designs and optimized applications for multiple devices and screen sizes.',
				'Collaborated closely with product managers and designers to translate business requirements into technical specifications.',
				'Mentored junior developers through guidance, knowledge-sharing, and React.js workshops.'
			],
			tags: ['Reactjs', 'TypeScript', 'Redux', 'Node.js', 'Cypress', 'Vitest', 'Vite'],
			textColor: 'text-brand-primary',
			bgColor: 'bg-brand-primary/5',
			gradientFrom: 'from-brand-primary',
			gradientTo: 'to-accent-orange',
			borderHover: 'hover:border-brand-primary/30'
		}
	];
</script>

<section
	class="scroll-section relative z-10 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-gray-200 dark:border-white/5"
	id="experience"
>
	<div class="absolute inset-0 z-0 bg-hero-glow-light dark:bg-hero-glow pointer-events-none"></div>
	<div
		class="absolute right-[-10%] top-[20%] w-[800px] h-[800px] rounded-full border border-gray-200/40 dark:border-white/5 opacity-40 pointer-events-none"
	></div>
	<div
		class="absolute right-[-5%] top-[25%] w-[600px] h-[600px] rounded-full border border-gray-200/40 dark:border-white/5 opacity-30 pointer-events-none"
	></div>
	<div
		class="absolute right-[0%] top-[30%] w-[400px] h-[400px] rounded-full border border-gray-200/40 dark:border-white/5 opacity-20 pointer-events-none"
	></div>
	<div
		class="absolute right-[10%] top-[20%] w-24 h-24 rounded-2xl bg-linear-to-br from-primary to-accent-orange opacity-10 blur-2xl animate-float pointer-events-none"
	></div>

	<div class="max-w-4xl mx-auto relative z-10">
		<div class="text-center mb-16 space-y-4">
			<h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
				My <span class="text-primary">Experience</span>
			</h2>
			<p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
				My professional journey and career milestones in the tech industry.
			</p>
		</div>

		<div class="space-y-6">
			{#each experiences as exp (exp.role + exp.company)}
				<div
					class="group bg-white dark:bg-dark-card rounded-2xl p-8 border border-gray-100 dark:border-white/5 shadow-md hover:shadow-xl {exp.borderHover} transition-all duration-300 flex flex-col md:flex-row gap-6 relative overflow-hidden"
				>
					<div
						class="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b {exp.gradientFrom} {exp.gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					></div>

					<div
						class="md:w-1/4 flex flex-col items-start md:border-r md:border-gray-100 dark:md:border-white/5 pr-4"
					>
						<h4 class="text-lg font-bold text-gray-900 dark:text-white">{exp.role}</h4>
						<span class="text-sm font-medium {exp.textColor} mt-1">{exp.company}</span>
						<div
							class="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-100 dark:border-white/5"
						>
							<span class="material-icons-outlined text-sm">calendar_today</span>
							{exp.period}
						</div>
					</div>

					<div class="md:w-3/4 space-y-3">
						<p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
							{exp.description}
						</p>
						<ul class="space-y-2 mt-2">
							{#each exp.highlights as highlight (highlight)}
								<li class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
									<span class="material-icons-outlined {exp.textColor} text-lg mt-0.5"
										>check_circle</span
									>
									<span>{highlight}</span>
								</li>
							{/each}
						</ul>
						<div class="flex flex-wrap gap-2 pt-3">
							{#each exp.tags as tag (tag)}
								<span class="text-xs font-medium {exp.textColor} {exp.bgColor} px-2 py-1 rounded"
									>{tag}</span
								>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
