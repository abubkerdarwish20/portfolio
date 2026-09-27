<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { GithubIcon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
	import BrowserFrame from './BrowserFrame.svelte';
	import { iconFor, shot, type Project } from './projects';

	const {
		project,
		index,
		total,
		enter = 1,
		covered = 0
	}: {
		project: Project;
		index: number;
		total: number;
		/** 0 → 1 as the card scrolls up into its pinned slot — drives the parallax */
		enter?: number;
		/** 0 → 1 as the next card slides over this one — drives shrink + dim */
		covered?: number;
	} = $props();

	let card: HTMLElement;

	// Border spotlight follows the cursor
	function onpointermove(e: PointerEvent) {
		const r = card.getBoundingClientRect();
		card.style.setProperty('--mx', `${e.clientX - r.left}px`);
		card.style.setProperty('--my', `${e.clientY - r.top}px`);
	}

	// Chips sit at different depths, so they drift at different speeds while the card enters
	const chipSpots = [
		{ cls: '-top-4 left-6', depth: 60 },
		{ cls: 'top-1/2 -right-4', depth: 110 },
		{ cls: '-bottom-5 left-[18%]', depth: 85 }
	];
	const drift = $derived(1 - enter);
</script>

<article
	bind:this={card}
	class="card group relative isolate overflow-hidden rounded-[2rem]"
	style="--accent: {project.accent}; transform: scale({1 - covered * 0.06})"
	{onpointermove}
>
	<!-- Atmosphere -->
	<div
		class="glow pointer-events-none absolute -top-40 -right-40 -z-10 size-[520px] rounded-full"
		aria-hidden="true"
	></div>
	<div class="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>
	<span
		class="watermark pointer-events-none absolute -bottom-16 -left-4 -z-10 font-bold leading-none select-none"
		aria-hidden="true">0{index + 1}</span
	>

	<!-- Header -->
	<header class="flex items-center gap-4 border-b px-6 py-4 sm:px-10">
		<span class="font-mono text-xs text-gray-400 tabular-nums">
			<span class="text-[var(--accent)]">0{index + 1}</span> / 0{total}
		</span>
		<span class="relative h-px w-16 overflow-hidden bg-gray-200 dark:bg-white/10">
			<span
				class="absolute inset-y-0 left-0 bg-[var(--accent)]"
				style="width: {((index + 1) / total) * 100}%"
			></span>
		</span>
		<span
			class="chip ml-auto rounded-full px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase"
		>
			{project.category}
		</span>
		<span
			class="hidden items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-[11px] font-semibold text-gray-500 sm:inline-flex dark:border-white/10 dark:text-gray-400"
		>
			<HugeiconsIcon icon={GithubIcon} size={12} /> Open source
		</span>
	</header>

	<div class="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
		<!-- Copy -->
		<div>
			<h3 class="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
				{project.title}
			</h3>
			<p class="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>

			<p class="mt-7 text-[11px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
				Built with
			</p>
			<ul class="mt-3 flex flex-wrap gap-2">
				{#each project.tags as tag, k (tag)}
					{@const icon = iconFor(tag)}
					<li
						class="tech inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold"
						style="--k: {k}"
					>
						{#if icon}
							<img src={icon.src} alt="" class="size-4 {icon.invertOnDark ? 'dark:invert' : ''}" />
						{/if}
						{tag}
					</li>
				{/each}
			</ul>

			<div class="mt-9 flex flex-wrap gap-3">
				<a
					href={project.live}
					target="_blank"
					rel="noopener noreferrer"
					class="live group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white"
				>
					<span class="shine" aria-hidden="true"></span>
					Live demo
					<span class="arrow-wrap relative size-4 overflow-hidden" aria-hidden="true">
						<span class="arrow absolute inset-0"
							><HugeiconsIcon icon={ArrowUpRight01Icon} size={16} /></span
						>
						<span class="arrow arrow-next absolute inset-0"
							><HugeiconsIcon icon={ArrowUpRight01Icon} size={16} /></span
						>
					</span>
				</a>
				<a
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:border-white/10 dark:text-gray-200"
				>
					<HugeiconsIcon icon={GithubIcon} size={16} /> Source code
				</a>
			</div>
		</div>

		<!-- Composition: angled browser + floating feature chips -->
		<div class="composition relative" style="perspective: 1600px">
			<div class="frame-tilt" style="translate: 0 {drift * 50}px">
				<BrowserFrame url={project.live}>
					<img
						{...shot(project)}
						sizes="(min-width: 1024px) 620px, 100vw"
						loading="lazy"
						decoding="async"
						class="shot aspect-[1600/787] w-full object-cover object-top"
					/>
				</BrowserFrame>
			</div>

			{#each project.features.slice(0, chipSpots.length) as feature, k (feature)}
				<span
					class="feature absolute hidden items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold whitespace-nowrap sm:inline-flex {chipSpots[
						k
					].cls}"
					style="translate: 0 {drift * chipSpots[k].depth}px; --k: {k}"
				>
					<span class="dot size-1.5 rounded-full"></span>
					{feature}
				</span>
			{/each}
		</div>
	</div>

	<!-- Dims the card as the next one covers it -->
	<div
		class="pointer-events-none absolute inset-0 z-10 bg-black"
		style="opacity: {covered * 0.5}"
		aria-hidden="true"
	></div>
</article>

<style>
	.card {
		--mx: -999px;
		--my: -999px;
		background: white;
		border: 1px solid rgb(229 231 235);
		box-shadow: 0 -24px 70px -30px rgb(0 0 0 / 0.3);
		transform-origin: top center;
		will-change: transform;
	}
	:global(.dark) .card {
		background: #0e0e11;
		border-color: rgb(255 255 255 / 0.07);
	}
	/* Accent hairline across the top edge */
	.card::after {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--accent), transparent);
		opacity: 0.7;
	}
	/* Cursor spotlight on the border */
	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 20;
		border-radius: inherit;
		padding: 1px;
		background: radial-gradient(
			420px circle at var(--mx) var(--my),
			var(--accent),
			transparent 45%
		);
		mask:
			linear-gradient(#000 0 0) content-box,
			linear-gradient(#000 0 0);
		mask-composite: exclude;
		-webkit-mask-composite: xor;
		opacity: 0;
		transition: opacity 0.4s;
		pointer-events: none;
	}
	.card:hover::before {
		opacity: 1;
	}
	header {
		border-color: rgb(229 231 235);
	}
	:global(.dark) header {
		border-color: rgb(255 255 255 / 0.06);
	}

	.glow {
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--accent) 22%, transparent),
			transparent 65%
		);
	}
	.grid-bg {
		background-image:
			linear-gradient(to right, rgb(0 0 0 / 0.04) 1px, transparent 1px),
			linear-gradient(to bottom, rgb(0 0 0 / 0.04) 1px, transparent 1px);
		background-size: 44px 44px;
		mask-image: radial-gradient(ellipse 60% 70% at 80% 30%, #000, transparent 75%);
	}
	:global(.dark) .grid-bg {
		background-image:
			linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px),
			linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px);
	}
	.watermark {
		font-size: clamp(10rem, 22vw, 18rem);
		color: transparent;
		-webkit-text-stroke: 1px color-mix(in srgb, var(--accent) 22%, transparent);
	}

	.chip {
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 10%, transparent);
	}
	.tech {
		color: #374151;
		background: #f3f4f6;
		transition:
			transform 0.4s var(--ease-out-expo),
			background-color 0.3s;
	}
	:global(.dark) .tech {
		color: #e5e7eb;
		background: rgb(255 255 255 / 0.05);
	}
	.tech:hover {
		transform: translateY(-2px);
		background: color-mix(in srgb, var(--accent) 12%, transparent);
	}

	.live {
		background: var(--accent);
		box-shadow: 0 12px 28px -12px var(--accent);
		transition:
			transform 0.3s var(--ease-out-expo),
			box-shadow 0.3s;
	}
	.live:hover {
		transform: translateY(-2px);
		box-shadow: 0 18px 36px -12px var(--accent);
	}
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
	.live:hover .shine {
		transform: translateX(100%);
		transition: transform 0.8s var(--ease-out-expo);
	}
	/* Arrow exits top-right while a fresh one slides in from bottom-left */
	.arrow {
		transition: transform 0.45s var(--ease-out-expo);
	}
	.arrow-next {
		transform: translate(-100%, 100%);
	}
	.live:hover .arrow {
		transform: translate(100%, -100%);
	}
	.live:hover .arrow-next {
		transform: none;
	}

	/* Browser sits at an angle and squares up on hover */
	.frame-tilt {
		transform: rotateY(-9deg) rotateX(4deg);
		transform-style: preserve-3d;
		transition: transform 0.9s var(--ease-out-expo);
		filter: drop-shadow(0 40px 50px rgb(0 0 0 / 0.25));
	}
	.group:hover .frame-tilt {
		transform: none;
	}
	.shot {
		transition: transform 0.9s var(--ease-out-expo);
	}
	.group:hover .shot {
		transform: scale(1.03);
	}

	.feature {
		z-index: 5;
		color: #1f2937;
		background: rgb(255 255 255 / 0.85);
		border: 1px solid rgb(229 231 235);
		backdrop-filter: blur(10px);
		box-shadow: 0 12px 30px -12px rgb(0 0 0 / 0.3);
		animation: float 6s ease-in-out infinite;
		animation-delay: calc(var(--k) * -2s);
	}
	:global(.dark) .feature {
		color: #f3f4f6;
		background: rgb(24 24 28 / 0.8);
		border-color: rgb(255 255 255 / 0.1);
	}
	.dot {
		background: var(--accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent);
	}
	@keyframes float {
		50% {
			transform: translateY(-6px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.feature {
			animation: none;
		}
		.frame-tilt,
		.feature {
			translate: none !important;
		}
	}
</style>
