<script lang="ts">
	const skills = [
		{
			name: 'HTML5',
			alt: 'HTML5',
			icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB04zyuHG28E0Xhhrdx3KvUfjcWt2oRZ8iBoQm8Sa-fyez8NlAGZUANQWiMj8rlzvngxckwV9pQ0ZcCdtzSDg7ed15zexItOi5GTjYz5WPUczrgvkZ9P-jmJ6z30dzyZp8-YRTg9uIAhu9DIMB5-aWq_XH_Q4qEfcNkLRsfpAjuFdZJ_eGwXuRVf34mOIgFBPAyGrZhSJkXkYqZejWnCC1kROBVAoHnU6vc04Msncj6qyFPup6m20vQF4Te4i9wBkUBxDZHl6LUms',
			glowClass: 'bg-orange-500/10 dark:bg-orange-500/20 group-hover:bg-orange-500/30'
		},
		{
			name: 'CSS3',
			alt: 'CSS3',
			icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAauML0kt6uIbzxUE0x7QBBWFLcdpkAVLk8f3tJoXQ3OD7W6DObJHGzKpTLMeJvjjUlONCoL0ZQutren0Fa_19dezfLdD6aoaIp0BFfcnIdnlXAiuRKcxa7sUVT3Rx3AVjmaTZA4LlcfmrLl154tOLr3VAbo9cxwVKbtUsyaVrR9hn02knjel5ccrR3C6RouCCMi-A0CbhEcV4k0xTL6SO1W52PctmzxbnsxVnpvOaixgxaf-10jho60iYVIOjiruMpPPVMAmjZ1bY',
			glowClass: 'bg-blue-500/10 dark:bg-blue-500/20 group-hover:bg-blue-500/30'
		},
		{
			name: 'JavaScript',
			alt: 'JavaScript',
			icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl8eLvVx-kTtuQ0ZZc8Gy4KqS1HRYyYWbxCL7Zyo04bFsozUcc0Q9gFw6dCM2BdU00z3BsDaVct32QlWGTTtP1mv3XUCjA6p2EKHwBgpC1qO7icic06Fn0XyiFKTg2fCRji1T9xVSoNuezIgnnTWmHvtBOsjKJxDWmk7Xz7rEVqwCgAVwV6kN0OsC4ewhX9aGVq8YxG4NhqmlG6Jp_XrEPT-t1pjX8zfc6d7H8LPQYXqIk830w3EVdRXriHIJhfYHJjbwQ9q0PLx8',
			glowClass: 'bg-yellow-400/10 dark:bg-yellow-400/20 group-hover:bg-yellow-400/30'
		},
		{
			name: 'React',
			alt: 'React',
			type: 'modern-icon',
			iconName: 'code',
			glowClass: 'bg-cyan-400/10 dark:bg-cyan-400/20 group-hover:bg-cyan-400/30',
			iconBg: 'bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-cyan-500/20',
			rotation: 'rotate-3 group-hover:rotate-12'
		},
		{
			name: 'TypeScript',
			alt: 'TypeScript',
			type: 'ts-icon',
			text: 'TS',
			glowClass: 'bg-blue-600/10 dark:bg-blue-600/20 group-hover:bg-blue-600/30',
			iconBg: 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-blue-600/20 border-blue-900/20',
			rotation: '-rotate-3 group-hover:-rotate-12'
		},
		{
			name: 'Figma',
			alt: 'Figma',
			icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPzwa4xgnb0pA8jQqr2vBw5UwDtld9Hc5FEVcFTgE3842QafrJi1dNb44yPWheF0rQStdQ_gJj84Py4ZU8tWj3JvnrK5ViyN4lmh-sNzSeOwAiZfQsU9eoAedajlKFMQRM1bVRkvAXEERJ8LirBiy1W_T2-wic81triE5JJg_hEBahDulXvlO5FtaweZo0Q_O5EGcLLTUN_n20EzumpiFJdpqey2YpveL_rAKNN5rJZaE5I2wlWkkAEheDksuVO8Kci9q1fDHspOQ',
			glowClass: 'bg-purple-500/10 dark:bg-purple-500/20 group-hover:bg-purple-500/30'
		}
	];
</script>

<section
	class="scroll-section !scroll-m-48 relative z-10 py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-transparent to-gray-50 dark:to-white/5"
	id="skills"
>
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16 space-y-4">
			<h2 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
				Technical <span class="text-brand-primary">Skills</span>
			</h2>
			<p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
				I leverage a comprehensive stack of modern tools and frameworks to build scalable,
				high-performance web applications.
			</p>
		</div>

		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 perspective-1000">
			{#each skills as skill (skill.name)}
				<div
					class="group flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-2"
				>
					<div
						class="w-16 h-16 relative flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
					>
						<div
							class="absolute inset-0 rounded-full blur-xl transition-colors {skill.glowClass}"
						></div>

						{#if skill.type === 'modern-icon'}
							<div
								class="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform transition-all {skill.iconBg} {skill.rotation}"
							>
								<span class="material-icons-outlined text-white text-3xl">{skill.iconName}</span>
							</div>
						{:else if skill.type === 'ts-icon'}
							<div
								class="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform transition-all border-b-4 {skill.iconBg} {skill.rotation}"
							>
								<span class="font-bold text-white text-xl font-mono tracking-tighter"
									>{skill.text}</span
								>
							</div>
						{:else}
							<img
								alt={skill.alt}
								class="relative z-10 w-12 h-12 object-contain drop-shadow-md {skill.name === 'Figma'
									? 'w-10 h-10'
									: ''}"
								src={skill.icon}
							/>
						{/if}
					</div>
					<h3 class="font-bold text-gray-800 dark:text-gray-100">{skill.name}</h3>
				</div>
			{/each}
		</div>
	</div>
</section>
