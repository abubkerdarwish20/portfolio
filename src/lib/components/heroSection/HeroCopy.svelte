<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { ArrowRight02Icon, Download01Icon } from '@hugeicons/core-free-icons';
	import { careerYears } from '$lib/components/experienceSection/experience';

	const years = careerYears();
</script>

<div class="flex flex-col items-start gap-7">
	<span
		class="reveal-fade inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs font-medium text-gray-600 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
		style="--d: 0ms"
	>
		<span class="relative flex size-2">
			<span class="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
			<span class="relative size-2 rounded-full bg-emerald-500"></span>
		</span>
		Open to new opportunities
	</span>

	<h1
		class="text-4xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white"
	>
		<span class="reveal-line">
			<span style="--d: 80ms">Hi, I'm <span class="text-brand-primary">Abubker</span></span>
		</span>
		<span class="reveal-line"><span style="--d: 170ms">Senior Frontend</span></span>
		<span class="reveal-line">
			<span
				style="--d: 260ms"
				class="bg-linear-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent dark:from-white dark:to-gray-500"
				>Engineer.</span
			>
		</span>
	</h1>

	<p
		class="reveal-fade max-w-lg text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-400"
		style="--d: 450ms"
	>
		{years}+ years building fast, accessible products — from design systems to payroll platforms
		trusted by thousands of companies.
	</p>

	<div class="reveal-fade flex flex-wrap items-center gap-3" style="--d: 580ms">
		<a
			href="#contact"
			class="cta group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-primary px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-primary/25 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-primary/30"
		>
			<span class="shine" aria-hidden="true"></span>
			Let's talk
			<HugeiconsIcon
				icon={ArrowRight02Icon}
				size={18}
				className="transition-transform duration-300 group-hover:translate-x-1"
			/>
		</a>
		<a
			href="/abubker-darwish-cv.pdf"
			download="abubker-darwish-cv.pdf"
			class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3.5 font-semibold text-gray-700 transition-colors duration-300 hover:border-brand-primary/40 hover:text-brand-primary dark:border-white/10 dark:text-gray-200"
		>
			<HugeiconsIcon icon={Download01Icon} size={18} />
			Resume
		</a>
	</div>
</div>

<style>
	.shine {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			110deg,
			transparent 30%,
			rgb(255 255 255 / 0.35) 50%,
			transparent 70%
		);
		transform: translateX(-100%);
	}
	.cta:hover .shine {
		transform: translateX(100%);
		transition: transform 0.8s var(--ease-out-expo);
	}
</style>
