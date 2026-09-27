<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { inview } from '$lib/actions/inview';
	import CaseMock from './CaseMock.svelte';
	import type { CaseStudy } from './caseStudies';

	const { study, index }: { study: CaseStudy; index: number } = $props();

	/** Divider position 0–100: left of it is "before", right of it is "after" */
	let pos = $state(50);
	let dragging = $state(false);
	let stage: HTMLDivElement;
	let intro = 0;

	// On first view, sweep the divider so the interaction explains itself
	function hint() {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const keys = [
			{ t: 0, p: 50 },
			{ t: 700, p: 88 },
			{ t: 1500, p: 18 },
			{ t: 2300, p: 50 }
		];
		const t0 = performance.now() + index * 350;
		const ease = (x: number) => 1 - Math.pow(1 - x, 3);
		const tick = (now: number) => {
			if (dragging) return;
			const t = Math.max(0, now - t0);
			const k = keys.findIndex((key, i) => i > 0 && t < key.t);
			if (k === -1) {
				pos = 50;
				return;
			}
			const a = keys[k - 1];
			const b = keys[k];
			pos = a.p + (b.p - a.p) * ease((t - a.t) / (b.t - a.t));
			intro = requestAnimationFrame(tick);
		};
		intro = requestAnimationFrame(tick);
	}

	function setFrom(e: PointerEvent) {
		const r = stage.getBoundingClientRect();
		pos = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
	}

	function onpointerdown(e: PointerEvent) {
		cancelAnimationFrame(intro);
		dragging = true;
		stage.setPointerCapture(e.pointerId);
		setFrom(e);
	}

	function onkeydown(e: KeyboardEvent) {
		const delta = e.key === 'ArrowLeft' ? -5 : e.key === 'ArrowRight' ? 5 : 0;
		if (!delta) return;
		e.preventDefault();
		cancelAnimationFrame(intro);
		pos = Math.min(100, Math.max(0, pos + delta));
	}

	// Metrics reach their real value once "after" covers half the stage (the resting position),
	// and only shrink while dragging toward "before" — a resting card never shows a wrong figure
	const progress = $derived(Math.min(1, (100 - pos) / 50));
</script>

<article
	use:inview={{ onenter: hint }}
	data-inview="false"
	class="card reveal-fade flex flex-col rounded-[2rem] p-5 sm:p-7"
	style="--accent: {study.accent}; --d: {index * 120}ms"
>
	<div class="flex items-center gap-3">
		<span class="icon grid size-10 place-items-center rounded-xl">
			<HugeiconsIcon icon={study.icon} size={20} />
		</span>
		<span class="font-mono text-xs tracking-widest text-gray-400 uppercase">Case 0{index + 1}</span>
	</div>
	<h3 class="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		{study.title}
	</h3>
	<p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{study.description}</p>

	<!-- Before / after stage -->
	<div
		bind:this={stage}
		class="stage relative mt-8 touch-none select-none {dragging
			? 'cursor-grabbing'
			: 'cursor-ew-resize'}"
		role="slider"
		tabindex="0"
		aria-label="Compare before and after"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuenow={Math.round(100 - pos)}
		{onpointerdown}
		onpointermove={(e) => dragging && setFrom(e)}
		onpointerup={() => (dragging = false)}
		onpointercancel={() => (dragging = false)}
		{onkeydown}
	>
		<CaseMock id={study.id} step={0} />
		<div class="absolute inset-0" style="clip-path: inset(0 0 0 {pos}%)">
			<CaseMock id={study.id} step={2} />
		</div>

		<span class="tag left-3 bg-red-500/90">Before</span>
		<span class="tag right-3 bg-emerald-500/90">After</span>

		<div class="divider absolute top-0 bottom-0 w-0.5" style="left: {pos}%">
			<span
				class="handle absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs font-bold"
			>
				⇆
			</span>
		</div>
	</div>

	<!-- Narrative follows the divider: the side you drag toward comes forward -->
	<div class="mt-6 grid gap-5 sm:grid-cols-2">
		<div class="side" style="opacity: {0.4 + (pos / 100) * 0.6}">
			<p class="text-[11px] font-semibold tracking-[0.18em] text-red-500 uppercase">
				Before · Challenge
			</p>
			<p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{study.challenge}</p>
		</div>
		<div class="side" style="opacity: {0.4 + progress * 0.6}">
			<p class="text-[11px] font-semibold tracking-[0.18em] text-emerald-500 uppercase">
				After · Solution
			</p>
			<p class="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{study.solution}</p>
		</div>
	</div>

	<!-- Flexible spacer pins the outcome to the bottom so both cards line up -->
	<div class="min-h-6 flex-1" aria-hidden="true"></div>
	<div class="outcome rounded-2xl p-5">
		<div class="flex flex-wrap gap-x-8 gap-y-3">
			{#each study.metrics as m (m.label)}
				<div>
					<p class="text-4xl font-bold tracking-tight text-[var(--accent)] tabular-nums">
						{(m.value * progress).toFixed(m.decimals ?? 0)}{m.suffix}
					</p>
					<p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{m.label}</p>
				</div>
			{/each}
		</div>
		<p class="mt-4 text-sm leading-relaxed font-medium text-gray-900 dark:text-white">
			{study.outcome}
		</p>
	</div>
</article>

<style>
	.card {
		background: white;
		border: 1px solid rgb(229 231 235);
	}
	:global(.dark) .card {
		background: #0f0f12;
		border-color: rgb(255 255 255 / 0.07);
	}
	.icon {
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 12%, transparent);
	}
	.side {
		transition: opacity 0.2s;
	}
	.outcome {
		background: color-mix(in srgb, var(--accent) 7%, transparent);
		border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
	}
	.stage:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 6px;
		border-radius: 1rem;
	}
	.tag {
		position: absolute;
		top: -0.75rem;
		padding: 0.15rem 0.5rem;
		border-radius: 9999px;
		color: white;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		pointer-events: none;
	}
	.divider {
		background: var(--accent);
		transform: translateX(-50%);
		box-shadow: 0 0 20px var(--accent);
		pointer-events: none;
	}
	.handle {
		color: white;
		background: var(--accent);
		box-shadow:
			0 0 0 4px color-mix(in srgb, var(--accent) 25%, transparent),
			0 8px 20px -6px var(--accent);
	}
</style>
