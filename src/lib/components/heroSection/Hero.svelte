<script lang="ts">
	import { onMount } from 'svelte';
	import HeroContent from './HeroContent.svelte';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import {
		SourceCodeIcon,
		GithubIcon,
		Linkedin01Icon,
		Mail01Icon
	} from '@hugeicons/core-free-icons';

	let mounted = $state(false);

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 100);
	});
</script>

<section
	id="home"
	class="scroll-section scroll-m-16 relative flex grow items-center justify-center overflow-hidden px-4 pt-32 pb-10 lg:pb-20 sm:px-6 lg:px-8"
>
	<div class="bg-hero-glow-light dark:bg-hero-glow pointer-events-none absolute inset-0 z-0"></div>
	<div
		class="absolute right-[-10%] top-[20%] h-[800px] w-[800px] pointer-events-none rounded-full border border-gray-200/40 opacity-40 dark:border-white/5"
	></div>
	<div
		class="absolute right-[-5%] top-[25%] h-[600px] w-[600px] pointer-events-none rounded-full border border-gray-200/40 opacity-30 dark:border-white/5"
	></div>
	<div
		class="absolute right-[0%] top-[30%] h-[400px] w-[400px] pointer-events-none rounded-full border border-gray-200/40 opacity-20 dark:border-white/5"
	></div>
	<div
		class="bg-linear-to-br from-brand-primary to-accent-orange animate-float pointer-events-none absolute right-[10%] top-[20%] h-24 w-24 rounded-2xl opacity-20 blur-2xl"
	></div>
	<div
		class="animate-float-delayed pointer-events-none absolute bottom-[10%] left-[5%] h-32 w-32 rounded-full bg-blue-500 opacity-10 blur-3xl"
	></div>

	<div class="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-4 lg:grid-cols-2">
		<HeroContent />

		<div class="relative flex h-125 w-full items-center justify-center lg:h-150">
			<div
				class="relative h-75 w-75 sm:h-112.5 sm:w-112.5 transition-[transform,opacity] duration-1000 delay-2200 {mounted
					? 'scale-100 opacity-100'
					: 'scale-90 opacity-0'}"
			>
				<div
					class="from-brand-primary/20 absolute inset-0 rounded-full bg-linear-to-tr to-purple-500/20 blur-3xl"
				></div>
				<div
					class="absolute inset-0 rounded-full border border-dashed border-gray-300/50 dark:border-white/10"
				></div>
				<div
					class="absolute inset-[15%] rounded-full border border-dotted border-gray-300/50 dark:border-white/10"
				></div>

				<!-- Icons -->
				<div
					class="absolute -top-[6%] left-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-6 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-xl transition-[transform,opacity] duration-500 transform hover:scale-110 dark:border-white/5 dark:bg-[#1E1E1E] delay-2500 {mounted
						? 'translate-y-0 opacity-100'
						: 'translate-y-4 opacity-0'}"
				>
					<img
						alt="HTML5"
						class="h-8 w-8"
						src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
					/>
				</div>
				<div
					class="{mounted
						? 'animate-float opacity-100'
						: 'opacity-0'} absolute right-0 top-[20%] z-20 flex h-14 w-14 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-xl transition-[transform,opacity] duration-500 delay-2700 transform hover:scale-110 dark:border-white/5 dark:bg-[#1E1E1E]"
				>
					<img
						alt="CSS3"
						class="h-8 w-8"
						src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
					/>
				</div>
				<div
					class="{mounted
						? 'animate-float-delayed opacity-100'
						: 'opacity-0'} absolute bottom-0 left-[20%] z-20 flex h-14 w-14 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-xl transition-[transform,opacity] duration-500 delay-2900 transform hover:scale-110 dark:border-white/5 dark:bg-[#1E1E1E]"
				>
					<img
						alt="Node.js"
						class="h-8 w-8"
						src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
					/>
				</div>
				<div
					class="absolute top-[65%] right-0 z-20 flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-xl transition-[transform,opacity] duration-500 delay-3100 transform hover:scale-110 dark:border-white/5 dark:bg-[#1E1E1E] {mounted
						? 'translate-x-0 opacity-100'
						: 'translate-x-4 opacity-0'}"
				>
					<img
						alt="TypeScript"
						class="h-6 w-6"
						src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
					/>
				</div>
				<div
					class="{mounted
						? 'animate-float opacity-100'
						: 'opacity-0'} absolute -left-[5%] top-[40%] z-20 flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-xl transition-[transform,opacity] duration-500 delay-3300 transform hover:scale-110 dark:border-white/5 dark:bg-[#1E1E1E]"
				>
					<img
						alt="Git"
						class="h-6 w-6"
						src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
					/>
				</div>

				<div
					class="absolute inset-[25%] z-10 flex flex-col items-center justify-center rounded-3xl border border-white/50 bg-linear-to-br from-gray-100 to-white p-6 shadow-2xl dark:border-white/5 dark:from-[#252525] dark:to-[#1a1a1a] transition-[transform,opacity] duration-1000 delay-2300 {mounted
						? 'translate-y-0 opacity-100'
						: 'translate-y-12 opacity-0'}"
				>
					<div
						class="from-brand-primary border-brand-primary shadow-brand-primary/30 mb-4 flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-full bg-linear-to-tr to-orange-400 shadow-lg p-4"
					>
						<HugeiconsIcon icon={SourceCodeIcon} size={40} className="text-white" />
					</div>
					<h3 class="text-base md:text-xl font-bold text-gray-900 dark:text-white">Clean Code</h3>
					<p class="mt-2 text-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
						Scalable & Maintainable
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Socials -->
	<div class="absolute bottom-10 left-6 z-20 hidden flex-col items-center gap-6 xl:flex">
		<div class="from-transparent to-gray-400 h-20 w-px bg-linear-to-b dark:to-gray-600"></div>
		<a
			class="hover:text-brand-primary text-gray-400 transition-[colors, transform] duration-300 ease-in-out transform hover:-translate-y-1"
			href="https://github.com/Abubker-Darwish"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="GitHub Profile"
		>
			<HugeiconsIcon icon={GithubIcon} size={20} />
		</a>
		<a
			class="hover:text-brand-primary text-gray-400 transition-[colors, transform] duration-300 ease-in-out transform hover:-translate-y-1"
			href="https://www.linkedin.com/in/abubker-darwish/"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="LinkedIn Profile"
		>
			<HugeiconsIcon icon={Linkedin01Icon} size={20} />
		</a>
		<a
			class="hover:text-brand-primary text-gray-400 transition-[colors, transform] duration-300 ease-in-out transform hover:-translate-y-1"
			href="mailto:abubker.darwish@gmail.com"
			aria-label="Email"
		>
			<HugeiconsIcon icon={Mail01Icon} size={20} />
		</a>
	</div>
</section>
