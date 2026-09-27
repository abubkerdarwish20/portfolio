<script lang="ts">
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import type { Step } from '../caseStudies';

	const { step = 0 }: { step?: Step } = $props();

	// Before: each component drifts with its own off-brand style. After: one aligned system.
	const blocks = [
		{ name: 'Button', drift: 'translate(-6px, 8px) rotate(-4deg)', radius: '4px', hue: '#a855f7' },
		{ name: 'Input', drift: 'translate(10px, -6px) rotate(3deg)', radius: '18px', hue: '#14b8a6' },
		{ name: 'Table', drift: 'translate(-4px, -10px) rotate(2deg)', radius: '2px', hue: '#f43f5e' },
		{ name: 'Modal', drift: 'translate(8px, 12px) rotate(-3deg)', radius: '14px', hue: '#eab308' },
		{ name: 'Tabs', drift: 'translate(-10px, 4px) rotate(5deg)', radius: '0px', hue: '#06b6d4' },
		{ name: 'Card', drift: 'translate(6px, -8px) rotate(-2deg)', radius: '20px', hue: '#84cc16' }
	];
	const pipeline = ['lint', 'test', 'build', 'deploy'];
	const header = [
		{ text: 'Inconsistent', cls: 'bad' },
		{ text: 'Building…', cls: 'busy' },
		{ text: 'Stable', cls: 'good' }
	];
	// 30 health bars — a handful of incidents before, all healthy after
	const incidents = new Set([4, 9, 10, 17, 23, 26]);
	const bars = Array.from({ length: 30 }, (_, i) => i);
</script>

<div class="mock rounded-2xl p-4 sm:p-5" class:aligned={step >= 1} class:healthy={step === 2}>
	<div class="flex items-center justify-between">
		<div>
			<p class="font-mono text-sm font-semibold text-gray-900 dark:text-white">packages/ui</p>
			<p class="text-xs text-gray-500">Shared component library</p>
		</div>
		<div class="grid">
			{#key step}
				<span
					class="status-chip {header[step]
						.cls} col-start-1 row-start-1 justify-self-end rounded-full px-2.5 py-1 text-[11px] font-semibold"
					in:fly={{ y: 8, duration: 400, easing: expoOut }}
					out:fly={{ y: -8, duration: 200 }}>{header[step].text}</span
				>
			{/key}
		</div>
	</div>

	<div class="mt-4 grid grid-cols-3 gap-2.5">
		{#each blocks as b, i (b.name)}
			<div
				class="tile grid h-14 place-items-center text-[11px] font-semibold"
				style="--drift: {b.drift}; --r: {b.radius}; --hue: {b.hue}; --i: {i}"
			>
				{b.name}
			</div>
		{/each}
	</div>

	<div class="mt-4 flex items-center gap-1.5">
		{#each pipeline as stage, i (stage)}
			{@const state = step === 0 ? (stage === 'test' ? 'fail' : 'idle') : 'pass'}
			<span
				class="stage flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 font-mono text-[10px] font-semibold sm:text-[11px]"
				data-state={state}
				style="--i: {i}"
			>
				<span class="icon">{state === 'pass' ? '✓' : state === 'fail' ? '✕' : '○'}</span>
				{stage}
			</span>
		{/each}
	</div>

	<div class="mt-4">
		<div class="flex items-end gap-[3px]">
			{#each bars as i (i)}
				<span
					class="hbar h-6 flex-1 rounded-[2px]"
					class:incident={incidents.has(i)}
					style="--i: {i}"
				></span>
			{/each}
		</div>
		<div class="mt-1.5 flex justify-between text-[10px] text-gray-400">
			<span>30 days ago</span>
			<span>today</span>
		</div>
	</div>
</div>

<style>
	.mock {
		--red: #ef4444;
		--amber: #f59e0b;
		--green: #10b981;
		--brand: #3b82f6;
		background: white;
		border: 1px solid rgb(229 231 235);
		box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.25);
	}
	:global(.dark) .mock {
		background: #121215;
		border-color: rgb(255 255 255 / 0.08);
	}

	.status-chip.bad {
		color: var(--red);
		background: color-mix(in srgb, var(--red) 12%, transparent);
	}
	.status-chip.busy {
		color: var(--amber);
		background: color-mix(in srgb, var(--amber) 12%, transparent);
	}
	.status-chip.good {
		color: var(--green);
		background: color-mix(in srgb, var(--green) 12%, transparent);
	}

	/* Blocks snap from scattered/off-brand into a uniform grid */
	.tile {
		transform: var(--drift);
		border-radius: var(--r);
		color: var(--hue);
		background: color-mix(in srgb, var(--hue) 12%, transparent);
		border: 1px dashed color-mix(in srgb, var(--hue) 45%, transparent);
		transition:
			transform 0.8s var(--ease-out-expo),
			border-radius 0.8s var(--ease-out-expo),
			color 0.5s,
			background-color 0.5s,
			border-color 0.5s;
		transition-delay: calc(var(--i) * 70ms);
	}
	.aligned .tile {
		transform: none;
		border-radius: 10px;
		color: var(--brand);
		background: color-mix(in srgb, var(--brand) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--brand) 30%, transparent);
	}

	.stage {
		--c: #9ca3af;
		color: var(--c);
		background: color-mix(in srgb, var(--c) 12%, transparent);
		transition:
			color 0.4s,
			background-color 0.4s;
		transition-delay: calc(var(--i) * 220ms + 200ms);
	}
	.stage[data-state='fail'] {
		--c: var(--red);
		transition-delay: 0s;
	}
	.stage[data-state='pass'] {
		--c: var(--green);
	}

	.hbar {
		background: var(--green);
		opacity: 0.8;
		transition:
			background-color 0.4s,
			transform 0.4s var(--ease-out-expo);
		transition-delay: calc(var(--i) * 18ms);
	}
	.hbar.incident {
		background: var(--red);
		transform: scaleY(0.55);
		transform-origin: bottom;
	}
	.hbar.incident:nth-child(odd) {
		background: var(--amber);
	}
	.healthy .hbar.incident {
		background: var(--green);
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.tile,
		.stage,
		.hbar {
			transition: none;
		}
	}
</style>
