<script lang="ts">
	import { onMount } from 'svelte';
	import HeroContent from './HeroContent.svelte';

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
						<span class="material-icons-outlined text-4xl text-white">code</span>
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
			class="hover:text-brand-primary text-gray-400 transition-colors transform hover:-translate-y-1"
			href="https://github.com/abubkerdarwish20"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="GitHub Profile"
		>
			<svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
				<path
					clip-rule="evenodd"
					d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
					fill-rule="evenodd"
				></path>
			</svg>
		</a>
		<a
			class="hover:text-brand-primary text-gray-400 transition-colors transform hover:-translate-y-1"
			href="https://www.linkedin.com/in/abubker-darwish/"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="LinkedIn Profile"
		>
			<svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
				<path
					clip-rule="evenodd"
					d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
					fill-rule="evenodd"
				></path>
			</svg>
		</a>
		<a
			class="hover:text-brand-primary text-gray-400 transition-colors transform hover:-translate-y-1"
			href="mailto:abubker.darwish@gmail.com"
			aria-label="Email"
		>
			<svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
				<path
					d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
				></path>
			</svg>
		</a>
	</div>
</section>
