<script lang="ts">
	import { fly } from 'svelte/transition';
	import { inview } from '$lib/actions/inview';
	import { careerMonths, formatDuration, months, period } from './experience';
	import { branches, commits, fullHash } from './gitHistory';

	const ROW = 52;
	const LANE_X = [16, 40];
	const STAGGER = 130;
	const COMMAND = 'git log --graph --decorate career';
	const HEX = '0123456789abcdef';

	const y = (i: number) => i * ROW + ROW / 2;
	const height = commits.length * ROW;
	const lastMain = commits.map((c) => c.lane).lastIndexOf(0);
	const mainAccent = commits[0].exp.accent;
	const hasHead = commits[0].refs.some((r) => r.kind === 'head');

	// Drawn top → bottom with the output; signals travel bottom → top (history grows upward)
	const mainDraw = `M ${LANE_X[0]} ${y(0)} L ${LANE_X[0]} ${y(lastMain)}`;
	const mainSignal = `M ${LANE_X[0]} ${y(lastMain)} L ${LANE_X[0]} ${y(0)}`;
	const [L0, L1] = LANE_X;
	const H = ROW / 2;
	const branchPaths = branches.map(({ exp, merge, last, fork }) => ({
		exp,
		draw: `M ${L0} ${y(merge)} C ${L0} ${y(merge) + H}, ${L1} ${y(merge + 1) - H}, ${L1} ${y(merge + 1)} L ${L1} ${y(last)} C ${L1} ${y(last) + H}, ${L0} ${y(fork) - H}, ${L0} ${y(fork)}`,
		signal: `M ${L0} ${y(fork)} C ${L0} ${y(fork) - H}, ${L1} ${y(last) + H}, ${L1} ${y(last)} L ${L1} ${y(merge + 1)} C ${L1} ${y(merge + 1) - H}, ${L0} ${y(merge) + H}, ${L0} ${y(merge)}`
	}));

	let reduce = $state(false);
	let typed = $state(0);
	let logShown = $state(false);
	let ready = $state(false);
	let scrambled = $state(commits.map((c) => c.hash));
	let selected = $state<number | null>(null);
	let auto = $state(true);
	let paused = $state(false);
	let visible = $state(false);
	let showTyped = $state(0);
	let term: HTMLDivElement;

	const commandDone = $derived(typed >= COMMAND.length);
	const current = $derived(selected === null ? null : commits[selected]);
	const showCommand = $derived(current ? `git show ${current.hash}` : '');

	const timers: Array<ReturnType<typeof setTimeout>> = [];
	let raf = 0;

	$effect(() => {
		reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
		io.observe(term);
		return () => {
			io.disconnect();
			timers.forEach(clearTimeout);
			cancelAnimationFrame(raf);
		};
	});

	function start() {
		if (reduce) {
			typed = COMMAND.length;
			logShown = ready = true;
			selected = 0;
			return;
		}
		const typing = setInterval(() => {
			typed++;
			if (typed < COMMAND.length) return;
			clearInterval(typing);
			timers.push(
				setTimeout(() => {
					logShown = true;
					scramble();
				}, 250)
			);
			timers.push(
				setTimeout(
					() => {
						ready = true;
						selected ??= 0;
					},
					250 + commits.length * STAGGER + 600
				)
			);
		}, 30);
		timers.push(typing as unknown as ReturnType<typeof setTimeout>);
	}

	// Hashes decode left → right, each row starting on its own reveal beat
	function scramble() {
		const t0 = performance.now();
		const tick = (now: number) => {
			let done = true;
			scrambled = commits.map((c, i) => {
				const p = Math.min(1, Math.max(0, (now - t0 - i * STAGGER) / 520));
				if (p < 1) done = false;
				const n = Math.floor(p * c.hash.length);
				let noise = '';
				for (let k = n; k < c.hash.length; k++) noise += HEX[(Math.random() * 16) | 0];
				return c.hash.slice(0, n) + noise;
			});
			if (!done) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
	}

	// Each selection re-types its `git show` command before the details stream in
	$effect(() => {
		const cmd = showCommand;
		if (!cmd) return;
		showTyped = 0;
		if (reduce) {
			showTyped = cmd.length;
			return;
		}
		const id = setInterval(() => {
			showTyped++;
			if (showTyped >= cmd.length) clearInterval(id);
		}, 16);
		return () => clearInterval(id);
	});

	function pick(i: number) {
		auto = false;
		selected = i;
	}

	const advance = () => (selected = ((selected ?? 0) + 1) % commits.length);
</script>

<div
	bind:this={term}
	use:inview={{ onenter: start }}
	data-inview="false"
	class="term relative rounded-2xl"
	role="group"
	aria-label="Career history as a git log"
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
>
	<div
		class="glow pointer-events-none absolute inset-x-0 -inset-y-10 -z-10 rounded-[3rem]"
		aria-hidden="true"
	></div>

	<div class="screen relative overflow-hidden rounded-2xl">
		<!-- Title bar -->
		<div class="flex items-center gap-3 border-b border-white/5 px-4 py-3">
			<div class="flex gap-1.5" aria-hidden="true">
				<span class="light bg-[#ff5f57]"></span>
				<span class="light bg-[#febc2e]"></span>
				<span class="light bg-[#28c840]"></span>
			</div>
			<span class="font-mono text-xs text-gray-500">~/abubker — zsh</span>
			<span class="ml-auto hidden font-mono text-[11px] text-gray-600 sm:inline">
				{commits.length} commits · {branches.length + 1} branches
			</span>
		</div>

		<div class="grid lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_380px]">
			<!-- Pane 1: git log -->
			<div class="min-w-0 p-5 font-mono text-[12.5px] sm:p-7 sm:text-[13px]">
				<p class="text-gray-300">
					<span class="text-emerald-400">➜</span>
					<span class="text-sky-400">~/abubker</span>
					{COMMAND.slice(0, typed)}{#if !commandDone}<span class="caret"></span>{/if}
				</p>

				<div
					class="graph relative mt-5"
					class:run={logShown}
					class:focus-main={current?.lane === 0}
					class:focus-branch={current?.lane === 1}
					style="height: {height}px; --n: {commits.length}"
				>
					<svg
						class="absolute top-0 left-0 overflow-visible"
						width="56"
						{height}
						aria-hidden="true"
					>
						<path class="path main-path" d={mainDraw} stroke={mainAccent} pathLength="1" />
						{#each branchPaths as b (b.exp.id)}
							<path class="path branch-path" d={b.draw} stroke={b.exp.accent} pathLength="1" />
						{/each}

						{#if ready && !reduce}
							<circle class="signal" r="3" fill={mainAccent}>
								<animateMotion dur="3.4s" repeatCount="indefinite" path={mainSignal} />
							</circle>
							{#each branchPaths as b (b.exp.id)}
								<circle class="signal" r="3" fill={b.exp.accent}>
									<animateMotion dur="2.2s" begin="0.9s" repeatCount="indefinite" path={b.signal} />
								</circle>
							{/each}
						{/if}

						{#if hasHead && ready}
							<circle
								class="halo"
								cx={LANE_X[0]}
								cy={y(0)}
								r="7"
								fill="none"
								stroke={mainAccent}
								stroke-width="2"
							/>
						{/if}

						{#each commits as c, i (c.hash)}
							{#if selected === i}
								<circle
									class="select-ring"
									cx={LANE_X[c.lane]}
									cy={y(i)}
									r="11"
									fill="none"
									stroke={c.exp.accent}
									stroke-width="1.5"
								/>
							{/if}
							<circle
								class="dot"
								cx={LANE_X[c.lane]}
								cy={y(i)}
								r={(c.strong ? 6 : 4) + (selected === i ? 1.5 : 0)}
								fill={c.strong || selected === i ? c.exp.accent : '#0d0d10'}
								stroke={c.exp.accent}
								stroke-width="2"
								style="--i: {i}"
							/>
						{/each}
					</svg>

					{#each commits as c, i (c.hash)}
						<button
							type="button"
							class="row absolute right-0 left-[60px] flex cursor-pointer items-center gap-3 rounded-lg px-2 text-left"
							class:selected={selected === i}
							style="top: {i * ROW + 4}px; height: {ROW - 8}px; --i: {i}; --accent: {c.exp.accent}"
							onmouseenter={() => pick(i)}
							onfocus={() => pick(i)}
							onclick={() => pick(i)}
						>
							<span class="shrink-0 text-amber-300/80 tabular-nums">{scrambled[i]}</span>
							{#each c.refs as ref (ref.label)}
								<span
									class="ref hidden shrink-0 rounded px-1.5 py-0.5 text-[11px] font-semibold sm:inline"
									class:head={ref.kind === 'head'}>{ref.label}</span
								>
							{/each}
							<span class="truncate {c.strong ? 'font-semibold text-white' : 'text-gray-300'}"
								>{c.message}</span
							>
							{#if c.date}
								<span class="ml-auto hidden shrink-0 pl-3 text-gray-500 sm:inline">{c.date}</span>
							{/if}
						</button>
					{/each}
				</div>

				<div class="tail" class:run={logShown} style="--n: {commits.length}">
					<p class="mt-4 text-gray-400">
						<span class="text-emerald-400">✔</span>
						{commits.length} commits · {branches.length + 1} branches ·
						<span class="text-white">{formatDuration(careerMonths())}</span> of history
					</p>
					<p class="mt-3 text-gray-300">
						<span class="text-emerald-400">➜</span>
						<span class="text-sky-400">~/abubker</span>
						<span class="caret"></span>
					</p>
				</div>
			</div>

			<!-- Pane 2: git show -->
			<div
				class="show relative min-w-0 border-t border-white/5 p-5 font-mono text-[12.5px] sm:p-7 lg:border-t-0 lg:border-l"
			>
				<div class="mb-5 flex items-center justify-between text-[11px] text-gray-600">
					<span>git show</span>
					{#if ready && auto}
						<span class="flex items-center gap-2">
							autoplay
							<span class="track relative h-[3px] w-16 overflow-hidden rounded-full">
								{#key selected}
									<span
										class="autobar absolute inset-0 origin-left"
										class:run={visible && !reduce}
										style="animation-play-state: {paused ? 'paused' : 'running'}"
										onanimationend={advance}
									></span>
								{/key}
							</span>
						</span>
					{/if}
				</div>

				{#if current}
					<p class="text-gray-300">
						<span class="text-emerald-400">➜</span>
						{showCommand.slice(0, showTyped)}{#if showTyped < showCommand.length}<span class="caret"
							></span>{/if}
					</p>

					{#if showTyped >= showCommand.length}
						{#key selected}
							{@const exp = current.exp}
							<div class="mt-4 space-y-3 leading-relaxed" style="--accent: {exp.accent}">
								<p class="break-all text-amber-300" in:fly={{ y: 6, duration: 400 }}>
									commit {fullHash(current.hash)}
								</p>
								<div class="text-gray-400" in:fly={{ y: 6, duration: 400, delay: 60 }}>
									<p><span class="text-gray-600">Role:</span> {exp.role}</p>
									<p>
										<span class="text-gray-600">At:</span>
										<a
											href={exp.link}
											target="_blank"
											rel="noopener noreferrer"
											class="text-[var(--accent)] hover:underline">{exp.company}</a
										>
										· {exp.type}
									</p>
									<p>
										<span class="text-gray-600">When:</span>
										{period(exp)} · {formatDuration(months(exp))}
									</p>
								</div>
								<p
									class="border-l-2 border-[var(--accent)] pl-3 font-semibold text-white"
									in:fly={{ y: 6, duration: 400, delay: 140 }}
								>
									{current.message}
								</p>
								{#if current.body && current.body !== current.message}
									<p class="pl-3.5 text-gray-400" in:fly={{ y: 6, duration: 400, delay: 200 }}>
										{current.body}
									</p>
								{/if}
								<div in:fly={{ y: 6, duration: 400, delay: 260 }}>
									<p class="text-gray-500">
										stack | {exp.tags.length}
										<span class="text-emerald-400">{'+'.repeat(exp.tags.length)}</span>
									</p>
									<div class="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
										{#each exp.tags as tag, k (tag)}
											<span
												class="text-emerald-400"
												in:fly={{ x: -6, duration: 350, delay: 320 + k * 45 }}>+ {tag}</span
											>
										{/each}
									</div>
								</div>
							</div>
						{/key}
					{/if}
				{:else}
					<p class="text-gray-600">
						<span class="text-emerald-400">➜</span> waiting for log…<span class="caret"></span>
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Entrance: the screen tilts up into place, then a glare sweeps across once */
	.term {
		opacity: 0;
		transform: perspective(1400px) rotateX(14deg) translateY(48px) scale(0.97);
		transition:
			opacity 0.8s ease,
			transform 1.2s var(--ease-out-expo);
	}
	.term:global([data-inview='true']) {
		opacity: 1;
		transform: none;
	}
	.screen {
		background: #0d0d10;
		border: 1px solid rgb(255 255 255 / 0.08);
		box-shadow: 0 40px 80px -30px rgb(0 0 0 / 0.55);
	}
	.screen::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: linear-gradient(
			105deg,
			transparent 40%,
			rgb(255 255 255 / 0.06) 50%,
			transparent 60%
		);
		transform: translateX(-100%);
	}
	.term:global([data-inview='true']) .screen::after {
		animation: glare 1.6s var(--ease-out-expo) 0.5s both;
	}
	@keyframes glare {
		to {
			transform: translateX(100%);
		}
	}
	.glow {
		background: radial-gradient(ellipse at 30% 40%, rgb(234 88 12 / 0.18), transparent 60%);
		filter: blur(30px);
	}
	.light {
		width: 12px;
		height: 12px;
		border-radius: 9999px;
	}

	.caret {
		display: inline-block;
		width: 7px;
		height: 1.1em;
		margin-left: 2px;
		vertical-align: -0.2em;
		background: #ea580c;
		animation: blink 1s steps(1) infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	/* Graph draw + row cascade */
	.path {
		fill: none;
		stroke-width: 2;
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		transition: opacity 0.4s;
	}
	.run .path {
		stroke-dashoffset: 0;
		transition:
			stroke-dashoffset 1.6s var(--ease-in-out-quart),
			opacity 0.4s;
	}
	.run .branch-path {
		transition-delay: 0.5s, 0s;
	}
	.focus-branch .main-path,
	.focus-main .branch-path {
		opacity: 0.3;
	}

	.dot,
	.row {
		opacity: 0;
	}
	.dot {
		transition:
			opacity 0.4s,
			r 0.3s var(--ease-out-expo);
	}
	.row {
		/* Invisible rows must not steal clicks before the log has printed */
		pointer-events: none;
		transform: translateX(-10px);
		transition:
			opacity 0.4s,
			transform 0.5s var(--ease-out-expo),
			background-color 0.25s;
	}
	/* Delay only the reveal — later changes (hover, selection) stay instant */
	.run .dot {
		opacity: 1;
		transition-delay: calc(var(--i) * 130ms), 0s;
	}
	.run .row {
		pointer-events: auto;
		opacity: 1;
		transform: none;
		transition-delay: calc(var(--i) * 130ms), calc(var(--i) * 130ms), 0s;
	}
	.row:hover,
	.row.selected {
		background: rgb(255 255 255 / 0.045);
	}
	.row.selected {
		box-shadow: inset 2px 0 0 var(--accent);
	}

	.tail p {
		opacity: 0;
		transition: opacity 0.5s;
	}
	.tail.run p {
		opacity: 1;
		transition-delay: calc(var(--n) * 130ms + 350ms);
	}
	.tail.run p + p {
		transition-delay: calc(var(--n) * 130ms + 750ms);
	}

	.signal {
		filter: drop-shadow(0 0 3px rgb(255 255 255 / 0.9)) drop-shadow(0 0 8px rgb(234 88 12 / 0.8));
	}
	.halo {
		transform-box: fill-box;
		transform-origin: center;
		animation: halo 2s ease-out infinite;
	}
	@keyframes halo {
		from {
			transform: scale(1);
			opacity: 0.7;
		}
		to {
			transform: scale(2.6);
			opacity: 0;
		}
	}
	.select-ring {
		transform-box: fill-box;
		transform-origin: center;
		animation: ring-in 0.45s var(--ease-out-expo);
	}
	@keyframes ring-in {
		from {
			transform: scale(0.4);
			opacity: 0;
		}
	}

	.ref {
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 15%, transparent);
		border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
	}
	.ref.head {
		color: #0d0d10;
		background: var(--accent);
	}

	.track {
		background: rgb(255 255 255 / 0.08);
	}
	.autobar {
		background: #ea580c;
		transform: scaleX(0);
	}
	.autobar.run {
		animation: fill 3.6s linear forwards;
	}
	@keyframes fill {
		to {
			transform: scaleX(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.term {
			opacity: 1;
			transform: none;
			transition: none;
		}
		.path,
		.dot,
		.row,
		.tail p {
			transition: none !important;
		}
		.caret,
		.halo,
		.select-ring,
		.term:global([data-inview='true']) .screen::after {
			animation: none;
		}
	}
</style>
