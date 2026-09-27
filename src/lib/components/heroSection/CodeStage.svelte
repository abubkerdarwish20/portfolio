<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { fly, fade } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';

	import { careerStartYear, careerYears } from '$lib/components/experienceSection/experience';

	const { tilt = { x: 0, y: 0 } }: { tilt?: { x: number; y: number } } = $props();

	const careerYearCount = careerYears();

	// Token kinds map to scoped `.tok-*` colors below. Keeping colors out of JS strings
	// means Tailwind's class scanner can never drop them.
	type Kind = 'kw' | 'comp' | 'attr' | 'str' | 'punc' | 'num' | 'text';
	type Token = [kind: Kind, text: string];

	const importLine = (name: string): Token[] => [
		['kw', 'import'],
		['text', ' { '],
		['comp', name],
		['text', ' } '],
		['kw', 'from'],
		['str', " '$lib/ui'"]
	];
	const prop = (name: string, value: Token[]): Token[] => [
		['text', '  '],
		['attr', name],
		...value
	];
	const str = (s: string): Token[] => [
		['punc', '='],
		['str', `"${s}"`]
	];
	const expr = (kind: Kind, s: string): Token[] => [
		['punc', '={'],
		[kind, s],
		['punc', '}']
	];

	const snippets: Array<{ file: string; lines: Token[][] }> = [
		{
			file: 'Button.svelte',
			lines: [
				importLine('Button'),
				[],
				[
					['punc', '<'],
					['comp', 'Button']
				],
				prop('variant', str('brand')),
				prop('onclick', expr('text', 'hire')),
				[['punc', '>']],
				[['text', "  Let's build together"]],
				[
					['punc', '</'],
					['comp', 'Button'],
					['punc', '>']
				]
			]
		},
		{
			file: 'StatCard.svelte',
			lines: [
				importLine('StatCard'),
				[],
				[
					['punc', '<'],
					['comp', 'StatCard']
				],
				prop('label', str('Years shipping')),
				prop('value', expr('num', String(careerYearCount))),
				prop('trend', str('up')),
				[['punc', '/>']]
			]
		},
		{
			file: 'Profile.svelte',
			lines: [
				importLine('Profile'),
				[],
				[
					['punc', '<'],
					['comp', 'Profile']
				],
				prop('name', str('Abubker Darwish')),
				prop('role', str('Senior Frontend')),
				prop('status', str('available')),
				[['punc', '/>']]
			]
		}
	];

	// Character offsets so the typewriter can slice tokens by a single counter
	const measured = snippets.map(({ lines }) => {
		let pos = 0;
		const lineStarts: number[] = [];
		const tokenStarts = lines.map((line) => {
			lineStarts.push(pos);
			const starts = line.map(([, text]) => {
				const start = pos;
				pos += text.length;
				return start;
			});
			pos += 1;
			return starts;
		});
		return { lineStarts, tokenStarts, total: pos - 1 };
	});

	let active = $state(0);
	let typed = $state(0);
	let phase = $state<'typing' | 'compiling' | 'rendered'>('typing');

	const caretLine = $derived.by(() => {
		const { lineStarts } = measured[active];
		let line = 0;
		for (let i = 0; i < lineStarts.length; i++) if (lineStarts[i] <= typed) line = i;
		return line;
	});

	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	$effect(() => {
		let cancelled = false;
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

		(async () => {
			await sleep(700);
			while (!cancelled) {
				for (let i = 0; i < snippets.length && !cancelled; i++) {
					active = i;
					typed = 0;
					phase = 'typing';
					const { total } = measured[i];
					if (reduce) typed = total;
					while (typed < total && !cancelled) {
						typed++;
						await sleep(22 + Math.random() * 38);
					}
					phase = 'compiling';
					await sleep(650);
					phase = 'rendered';
					await sleep(3600);
				}
			}
		})();

		return () => {
			cancelled = true;
		};
	});

	const years = new Tween(0, { duration: 1400, easing: expoOut });
	$effect(() => {
		if (phase === 'rendered' && active === 1) years.set(careerYearCount);
		else years.set(0, { duration: 0 });
	});
</script>

<div class="relative mx-auto w-full max-w-[560px]" style="perspective: 1400px">
	<div
		class="relative pb-24 sm:pb-28"
		style="transform-style: preserve-3d; transform: rotateX({-tilt.y * 8}deg) rotateY({tilt.x *
			12}deg)"
	>
		<!-- Editor -->
		<div
			class="editor relative w-full overflow-hidden rounded-2xl sm:w-[92%]"
			class:compiling={phase === 'compiling'}
		>
			<div class="editor-bar flex items-center gap-3 px-4 py-3">
				<div class="flex gap-1.5" aria-hidden="true">
					<span class="light light-red"></span>
					<span class="light light-amber"></span>
					<span class="light light-green"></span>
				</div>
				<div class="flex gap-1 overflow-hidden text-xs">
					{#each snippets as s, i (s.file)}
						<span class="tab" class:tab-active={i === active}>{s.file}</span>
					{/each}
				</div>
			</div>

			<pre class="code px-4 py-4 text-[12.5px] leading-7 sm:text-sm"><code
					>{#each snippets[active].lines as line, li (li)}<div class="flex"><span class="line-no"
								>{li + 1}</span
							><span class="whitespace-pre"
								>{#each line as [kind, text], ti (ti)}{@const start =
										measured[active].tokenStarts[li][ti]}{#if typed > start}<span class="tok-{kind}"
											>{text.slice(0, typed - start)}</span
										>{/if}{/each}{#if phase === 'typing' && li === caretLine}<span class="caret"
									></span>{/if}</span
							></div>{/each}</code
				></pre>

			<div class="editor-status flex items-center justify-between px-4 py-2 text-[11px]">
				<span class="flex items-center gap-2">
					{#if phase === 'typing'}
						<span class="status-dot bg-amber-400"></span> editing
					{:else if phase === 'compiling'}
						<span class="status-dot animate-pulse bg-brand-primary"></span> compiling…
					{:else}
						<span class="status-dot bg-emerald-400"></span> compiled in 12ms
					{/if}
				</span>
				<span>svelte · ts</span>
			</div>
			<div class="progress" class:run={phase === 'compiling'}></div>
		</div>

		<!-- Live preview, lifted toward the viewer -->
		<div class="absolute right-0 bottom-0 w-[64%] sm:w-[60%]" style="transform: translateZ(90px)">
			{#if phase === 'rendered'}
				<div
					in:fly={{ y: 30, duration: 700, easing: expoOut }}
					out:fade={{ duration: 250 }}
					class="preview rounded-2xl p-5 backdrop-blur-xl"
				>
					<div
						class="mb-4 flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-gray-400 uppercase"
					>
						<span class="status-dot bg-emerald-400"></span> Live preview
					</div>

					{#if active === 0}
						<div class="relative flex justify-center py-3">
							<button
								type="button"
								tabindex="-1"
								class="preview-btn relative overflow-hidden rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/30"
							>
								<span class="shine-auto" aria-hidden="true"></span>
								Let's build together
								<span class="ripple" aria-hidden="true"></span>
							</button>
							<svg
								class="fake-cursor"
								viewBox="0 0 24 24"
								width="22"
								height="22"
								aria-hidden="true"
							>
								<path
									d="M5 3l14 8-6.5 1.5L9 19z"
									class="fill-gray-900 stroke-white dark:fill-white dark:stroke-gray-900"
									stroke-width="1.5"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
					{:else if active === 1}
						<div>
							<p class="text-xs text-gray-500 dark:text-gray-400">Years shipping</p>
							<div class="mt-1 flex items-end justify-between">
								<span class="text-4xl font-bold text-gray-900 tabular-nums dark:text-white"
									>{Math.round(years.current)}<span class="text-brand-primary">+</span></span
								>
								<span class="trend rounded-full px-2 py-0.5 text-[11px] font-semibold"
									>↑ since {careerStartYear}</span
								>
							</div>
							<svg viewBox="0 0 200 50" class="mt-3 h-12 w-full" aria-hidden="true">
								<defs>
									<linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
										<stop offset="0%" stop-color="#ea580c" stop-opacity="0.3" />
										<stop offset="100%" stop-color="#ea580c" stop-opacity="0" />
									</linearGradient>
								</defs>
								<path
									class="spark-area"
									d="M0 45 L25 40 L50 42 L75 30 L100 32 L125 20 L150 22 L175 10 L200 4 L200 50 L0 50Z"
									fill="url(#spark-fill)"
								/>
								<path
									class="spark-line"
									d="M0 45 L25 40 L50 42 L75 30 L100 32 L125 20 L150 22 L175 10 L200 4"
									fill="none"
									stroke="#ea580c"
									stroke-width="2.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
					{:else}
						<div class="flex items-center gap-3">
							<div
								class="avatar grid size-12 shrink-0 place-items-center rounded-full font-bold text-white"
							>
								AD
							</div>
							<div class="min-w-0">
								<p class="truncate font-semibold text-gray-900 dark:text-white">Abubker Darwish</p>
								<p class="text-xs text-gray-500 dark:text-gray-400">Senior Frontend</p>
							</div>
						</div>
						<div class="mt-4 flex flex-wrap gap-1.5">
							{#each ['React', 'Svelte', 'TypeScript'] as chip, i (chip)}
								<span
									in:fly={{ y: 8, delay: 250 + i * 80, duration: 500, easing: expoOut }}
									class="chip rounded-md px-2 py-0.5 text-[11px] font-medium">{chip}</span
								>
							{/each}
						</div>
						<div class="available mt-4 flex items-center gap-2 text-xs font-medium">
							<span class="relative flex size-2">
								<span class="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75"
								></span>
								<span class="relative size-2 rounded-full bg-emerald-500"></span>
							</span>
							Available for work
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Editor chrome — always dark, like a real IDE, in both site themes */
	.editor {
		background: #0d0d10;
		border: 1px solid rgb(255 255 255 / 0.08);
		box-shadow: 0 30px 60px -15px rgb(0 0 0 / 0.45);
		transition: box-shadow 0.5s var(--ease-out-expo);
	}
	.editor.compiling {
		box-shadow:
			0 0 0 1px rgb(234 88 12 / 0.55),
			0 25px 60px -10px rgb(234 88 12 / 0.4);
	}
	.editor-bar {
		border-bottom: 1px solid rgb(255 255 255 / 0.06);
	}
	.editor-status {
		border-top: 1px solid rgb(255 255 255 / 0.06);
		color: #6b7280;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
	}
	.light {
		width: 12px;
		height: 12px;
		border-radius: 9999px;
	}
	.light-red {
		background: #ff5f57;
	}
	.light-amber {
		background: #febc2e;
	}
	.light-green {
		background: #28c840;
	}
	.tab {
		padding: 0.25rem 0.625rem;
		border-radius: 0.375rem;
		white-space: nowrap;
		color: #6b7280;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		transition:
			color 0.3s,
			background-color 0.3s;
	}
	.tab-active {
		color: #f3f4f6;
		background: rgb(255 255 255 / 0.08);
	}
	.code {
		min-height: 248px;
		margin: 0;
		color: #e5e7eb;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
	}
	.line-no {
		width: 1.75rem;
		flex-shrink: 0;
		color: #4b5563;
		user-select: none;
	}

	/* Syntax palette, tuned around the brand orange */
	.code :global(.tok-kw) {
		color: #fb923c;
	}
	.code :global(.tok-comp) {
		color: #fcd34d;
	}
	.code :global(.tok-attr) {
		color: #c4b5fd;
	}
	.code :global(.tok-str) {
		color: #86efac;
	}
	.code :global(.tok-num) {
		color: #f472b6;
	}
	.code :global(.tok-punc) {
		color: #6b7280;
	}
	.code :global(.tok-text) {
		color: #e5e7eb;
	}

	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 9999px;
	}

	/* Preview card — follows the site theme */
	.preview {
		background: rgb(255 255 255 / 0.92);
		border: 1px solid rgb(229 231 235 / 0.9);
		box-shadow: 0 30px 60px -15px rgb(0 0 0 / 0.25);
	}
	:global(.dark) .preview {
		background: rgb(26 26 29 / 0.92);
		border-color: rgb(255 255 255 / 0.1);
		box-shadow: 0 30px 60px -15px rgb(0 0 0 / 0.6);
	}
	.avatar {
		background: linear-gradient(135deg, #ea580c, #fbbf24);
	}
	.chip {
		background: #f3f4f6;
		color: #4b5563;
	}
	:global(.dark) .chip {
		background: rgb(255 255 255 / 0.06);
		color: #d1d5db;
	}
	.trend {
		background: rgb(16 185 129 / 0.12);
		color: #10b981;
	}
	.available {
		color: #10b981;
	}

	.caret {
		display: inline-block;
		width: 2px;
		height: 1.1em;
		margin-left: 1px;
		vertical-align: -0.15em;
		background: #ea580c;
		animation: blink 1s steps(1) infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.progress {
		height: 2px;
		background: linear-gradient(90deg, #ea580c, #fbbf24);
		transform: scaleX(0);
		transform-origin: left;
	}
	.progress.run {
		transform: scaleX(1);
		transition: transform 0.6s var(--ease-in-out-quart);
	}

	.shine-auto {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			110deg,
			transparent 30%,
			rgb(255 255 255 / 0.4) 50%,
			transparent 70%
		);
		animation: sweep 2.4s var(--ease-out-expo) 0.4s infinite;
		transform: translateX(-100%);
	}
	@keyframes sweep {
		60%,
		100% {
			transform: translateX(100%);
		}
	}

	.fake-cursor {
		position: absolute;
		left: 50%;
		top: 50%;
		animation: cursor-path 2.2s var(--ease-out-expo) both;
	}
	@keyframes cursor-path {
		0% {
			transform: translate(90px, 50px);
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		55% {
			transform: translate(10px, 4px);
		}
		62% {
			transform: translate(10px, 4px) scale(0.85);
		}
		70%,
		100% {
			transform: translate(10px, 4px) scale(1);
			opacity: 1;
		}
	}

	.preview-btn {
		animation: press 2.2s ease both;
	}
	@keyframes press {
		0%,
		58% {
			transform: scale(1);
		}
		63% {
			transform: scale(0.95);
		}
		72%,
		100% {
			transform: scale(1);
		}
	}

	.ripple {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 12px;
		height: 12px;
		margin: -6px 0 0 -6px;
		border-radius: 9999px;
		background: rgb(255 255 255 / 0.5);
		transform: scale(0);
		animation: ripple 2.2s ease-out both;
	}
	@keyframes ripple {
		0%,
		60% {
			transform: scale(0);
			opacity: 1;
		}
		100% {
			transform: scale(22);
			opacity: 0;
		}
	}

	.spark-line {
		stroke-dasharray: 260;
		stroke-dashoffset: 260;
		animation: draw 1.4s var(--ease-out-expo) 0.2s forwards;
	}
	.spark-area {
		opacity: 0;
		animation: fade-in 0.8s ease 0.9s forwards;
	}
	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}
	@keyframes fade-in {
		to {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.shine-auto,
		.preview-btn,
		.caret {
			animation: none;
		}
		.ripple,
		.fake-cursor {
			display: none;
		}
		.spark-line {
			animation: none;
			stroke-dashoffset: 0;
		}
		.spark-area {
			animation: none;
			opacity: 1;
		}
	}
</style>
