<script lang="ts">
	import SectionBackdrop from '$lib/components/SectionBackdrop.svelte';
	import { version } from '$app/environment';
	import { inview } from '$lib/actions/inview';
	import { navItems } from '$lib/nav';
	import { contact } from '$lib/components/contactSection/contact';
	import { LocalClock } from '$lib/components/contactSection/clock.svelte';

	const clock = new LocalClock();
	$effect(() => clock.start());

	type Seg = { t: string; c?: string; href?: string; download?: boolean; tip?: string };

	const q = (text: string, href?: string, tip?: string, download = false): Seg => ({
		t: `'${text}'`,
		c: 'str',
		href,
		tip,
		download
	});
	const k = (t: string): Seg => ({ t, c: 'key' });
	const p = (t: string): Seg => ({ t, c: 'punc' });
	const sp = (n: number): Seg => ({ t: ' '.repeat(n) });

	const sections = navItems.map((n) => q(n.label, n.href, `${n.href} — jump to section`));
	const sep = (i: number, last: number) => (i < last ? [p(', ')] : []);

	// The footer's sitemap, written as a TypeScript file — every string value is a live link
	const lines = $derived<Seg[][]>([
		[{ t: '// footer.ts — thanks for scrolling all the way down 👋', c: 'cm' }],
		[],
		[{ t: 'export const', c: 'kw' }, { t: ' ' }, { t: 'site', c: 'var' }, p(' = {')],
		[
			sp(2),
			k('sections'),
			p(': ['),
			...sections.slice(0, 3).flatMap((s, i) => [s, ...sep(i, 2)]),
			p(',')
		],
		[sp(13), ...sections.slice(3).flatMap((s, i) => [s, ...sep(i, 2)]), p('],')],
		[sp(2), k('social'), p(': {')],
		[
			sp(4),
			k('github'),
			p(': '),
			q('abubkerdarwish20', contact.github, 'github.com/abubkerdarwish20 ↗'),
			p(',')
		],
		[
			sp(4),
			k('linkedin'),
			p(': '),
			q('abubker-darwish', contact.linkedin, 'linkedin.com/in/abubker-darwish ↗'),
			p(',')
		],
		[sp(2), p('},')],
		[
			sp(2),
			k('email'),
			p(': '),
			q(contact.email, `mailto:${contact.email}`, 'Compose an email ✉'),
			p(',')
		],
		[sp(2), k('resume'), p(': '), q('cv.pdf', contact.cv, 'Download resume (PDF) ↓', true), p(',')],
		[sp(2), k('location'), p(': '), q(contact.location), p(',')],
		[
			sp(2),
			k('status'),
			p(': '),
			{ t: `'${clock.online ? 'online' : 'away'}'`, c: clock.online ? 'ok' : 'str' },
			p(','),
			{ t: `  // Mukalla ${clock.time}`, c: 'cm' }
		],
		[p('}'), { t: ' satisfies', c: 'kw' }, { t: ' Portfolio', c: 'type' }, p(';')],
		[],
		[{ t: '// EOF', c: 'cm' }]
	]);

	const CODELENS_BEFORE = 2; // index of the line the "Run" lens sits above

	let hover = $state<{ line: number; col: number } | null>(null);
	let tip = $state<{ text: string; x: number; y: number } | null>(null);
	let body: HTMLElement;

	function colOf(line: Seg[], seg: number) {
		return line.slice(0, seg).reduce((n, s) => n + s.t.length, 0) + 1;
	}

	function showTip(e: PointerEvent, text: string) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const b = body.getBoundingClientRect();
		tip = { text, x: r.left - b.left, y: r.top - b.top };
	}

	const openPalette = () =>
		dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true }));

	const toTop = () =>
		scrollTo({
			top: 0,
			behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
		});

	let shortcut = $state('⌘K');
	$effect(() => {
		if (!/Mac|iPhone|iPad/.test(navigator.userAgent)) shortcut = 'Ctrl K';
	});

	// SvelteKit's default `version` is the build timestamp
	const built = Number(version) ? new Date(Number(version)) : null;
	const builtLabel = built?.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
</script>

<footer class="relative isolate">
	<SectionBackdrop glows={[{ x: 50, y: 100, color: '#ea580c', w: 60, h: 50 }]} />
	<div class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
		<div
			use:inview
			data-inview="false"
			class="editor reveal-fade overflow-hidden rounded-2xl"
			style="--d: 0ms"
		>
			<!-- Tabs -->
			<div class="tabs flex items-stretch overflow-x-auto text-xs">
				<span class="tab active">
					<span class="ts">TS</span> footer.ts
					<span class="dot" aria-hidden="true"></span>
				</span>
				<span class="tab"><span class="ts">TS</span> contact.ts</span>
				<span class="tab hidden sm:flex"><span class="md">M↓</span> README.md</span>
			</div>

			<!-- Breadcrumbs -->
			<div
				class="crumbs flex items-center gap-1.5 overflow-x-auto px-4 py-1.5 font-mono text-[11px] whitespace-nowrap"
			>
				<span>src</span><span class="sep">›</span><span>lib</span><span class="sep">›</span><span
					>footer.ts</span
				><span class="sep">›</span><span class="text-gray-300">site</span>
			</div>

			<div
				bind:this={body}
				class="relative grid grid-cols-[minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_88px]"
			>
				<!-- Code -->
				<div
					class="code overflow-x-auto py-4 font-mono text-[12.5px] leading-7 sm:text-[13px]"
					role="presentation"
					onpointerleave={() => ((hover = null), (tip = null))}
				>
					{#each lines as line, li (li)}
						{#if li === CODELENS_BEFORE}
							<div class="flex">
								<span class="gutter"></span>
								<button type="button" class="lens" onclick={openPalette}>
									<span class="text-emerald-400">▶</span> Run contact()
									<span class="lens-sep">│</span>
									<kbd>{shortcut}</kbd>
								</button>
							</div>
						{/if}
						<div
							class="line flex"
							class:hot={hover?.line === li}
							style="--i: {li}"
							role="presentation"
							onpointerenter={() => (hover = { line: li, col: 1 })}
						>
							<span class="gutter">{li + 1}</span>
							<span class="pr-6 whitespace-pre"
								>{#each line as seg, si (si)}{#if seg.href}<a
											href={seg.href}
											class="tok {seg.c} link"
											target={seg.href.startsWith('http') ? '_blank' : undefined}
											rel={seg.href.startsWith('http') ? 'noopener noreferrer' : undefined}
											download={seg.download ? 'abubker-darwish-cv.pdf' : undefined}
											onpointerenter={(e) => {
												hover = { line: li, col: colOf(line, si) };
												if (seg.tip) showTip(e, seg.tip);
											}}
											onpointerleave={() => (tip = null)}>{seg.t}</a
										>{:else}<span
											class="tok {seg.c ?? ''}"
											role="presentation"
											onpointerenter={() => (hover = { line: li, col: colOf(line, si) })}
											>{seg.t}</span
										>{/if}{/each}{#if li === lines.length - 1}<span class="caret"></span>{/if}</span
							>
						</div>
					{/each}
				</div>

				<!-- Minimap -->
				<div class="minimap hidden py-4 pr-3 md:block" aria-hidden="true">
					{#each lines as line, li (li)}
						<div class="mini-row" class:hot={hover?.line === li}>
							{#each line.filter((s) => s.t.trim()) as seg, si (si)}
								<span class="mini {seg.c ?? ''}" style="width: {Math.max(2, seg.t.length * 1.1)}px"
								></span>
							{/each}
						</div>
						{#if li === CODELENS_BEFORE - 1}<div class="h-[28px]"></div>{/if}
					{/each}
					<div class="viewport"></div>
				</div>

				<!-- Hover widget -->
				{#if tip}
					<div
						class="hover-widget pointer-events-none absolute z-10 font-mono text-[11px]"
						style="left: {tip.x}px; top: {tip.y}px"
					>
						{tip.text}
						<span class="block text-[10px] text-gray-500">click to open</span>
					</div>
				{/if}
			</div>

			<!-- Status bar -->
			<div class="statusbar flex items-stretch overflow-x-auto font-mono text-[11px]">
				<span class="seg brand">⎇ main</span>
				<span class="seg">✓ 0 problems</span>
				<span class="seg hidden sm:flex"
					>Ln {hover ? hover.line + 1 : lines.length}, Col {hover?.col ?? 7}</span
				>
				<span class="seg hidden lg:flex">Spaces: 2</span>
				<span class="seg hidden lg:flex">UTF-8</span>
				<span class="seg hidden md:flex">TypeScript</span>
				<span class="ml-auto"></span>
				<span class="seg">
					<span class="size-1.5 rounded-full {clock.online ? 'bg-emerald-400' : 'bg-gray-500'}"
					></span>
					Mukalla {clock.time}
				</span>
				{#if builtLabel}<span class="seg hidden md:flex">Built {builtLabel}</span>{/if}
				<button
					type="button"
					class="seg cursor-pointer hover:text-white"
					onclick={toTop}
					aria-label="Back to top">↑ Top</button
				>
			</div>
		</div>

		<div
			class="mt-6 flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-gray-500 dark:text-gray-400"
		>
			<span>© {new Date().getFullYear()} {contact.name}. All rights reserved.</span>
			<span>Built with SvelteKit · Svelte 5 · Tailwind CSS 4</span>
		</div>
	</div>
</footer>

<style>
	/* Editor chrome — always dark, like the hero editor and the git log */
	.editor {
		background: #0d0d10;
		border: 1px solid rgb(255 255 255 / 0.08);
		box-shadow: 0 40px 80px -30px rgb(0 0 0 / 0.45);
		color: #e5e7eb;
	}
	.tabs {
		background: #0a0a0c;
		border-bottom: 1px solid rgb(255 255 255 / 0.06);
	}
	.tab {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1rem;
		color: #6b7280;
		border-right: 1px solid rgb(255 255 255 / 0.05);
		white-space: nowrap;
	}
	.tab.active {
		color: #f3f4f6;
		background: #0d0d10;
		box-shadow: inset 0 1px 0 #ea580c;
	}
	.ts {
		font-size: 9px;
		font-weight: 800;
		color: #3b82f6;
	}
	.md {
		font-size: 9px;
		font-weight: 800;
		color: #9ca3af;
	}
	.tab .dot {
		width: 6px;
		height: 6px;
		border-radius: 9999px;
		background: #9ca3af;
	}
	.crumbs {
		color: #6b7280;
		border-bottom: 1px solid rgb(255 255 255 / 0.04);
	}
	.sep {
		color: #4b5563;
	}

	.gutter {
		width: 3rem;
		flex-shrink: 0;
		padding-right: 1rem;
		text-align: right;
		color: #4b5563;
		user-select: none;
	}
	.line {
		transition: background-color 0.15s;
	}
	.line.hot {
		background: rgb(255 255 255 / 0.04);
	}
	.line.hot .gutter {
		color: #e5e7eb;
	}

	/* Lines print top → bottom when the footer scrolls into view */
	.line {
		opacity: 0;
		transform: translateX(-6px);
		transition:
			opacity 0.4s,
			transform 0.5s var(--ease-out-expo),
			background-color 0.15s;
		transition-delay: calc(var(--i) * 45ms), calc(var(--i) * 45ms), 0s;
	}
	:global([data-inview='true']) .line {
		opacity: 1;
		transform: none;
	}

	.tok.cm {
		color: #6b7280;
		font-style: italic;
	}
	.tok.kw {
		color: #fb923c;
	}
	.tok.var {
		color: #fcd34d;
	}
	.tok.type {
		color: #67e8f9;
	}
	.tok.key {
		color: #c4b5fd;
	}
	.tok.str {
		color: #86efac;
	}
	.tok.ok {
		color: #34d399;
		font-weight: 700;
	}
	.tok.punc {
		color: #6b7280;
	}
	/* Links read as strings until hovered, then underline like ⌘-hover in an editor */
	.link {
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 3px;
		border-radius: 3px;
		transition:
			color 0.15s,
			background-color 0.15s,
			text-decoration-color 0.15s;
	}
	.link:hover {
		color: #fdba74;
		background: rgb(234 88 12 / 0.12);
		text-decoration-color: currentColor;
	}

	.lens {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin: 0.1rem 0;
		padding: 0 0.25rem;
		border-radius: 4px;
		font-size: 11px;
		color: #9ca3af;
		cursor: pointer;
		transition:
			color 0.15s,
			background-color 0.15s;
	}
	.lens:hover {
		color: white;
		background: rgb(234 88 12 / 0.18);
	}
	.lens-sep {
		color: #374151;
	}
	.lens kbd {
		padding: 0 0.35rem;
		border-radius: 4px;
		border: 1px solid rgb(255 255 255 / 0.12);
		font-size: 10px;
	}

	.caret {
		display: inline-block;
		width: 2px;
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

	.hover-widget {
		transform: translateY(calc(-100% - 6px));
		padding: 0.4rem 0.6rem;
		border-radius: 6px;
		color: #e5e7eb;
		background: #1c1c21;
		border: 1px solid rgb(255 255 255 / 0.1);
		box-shadow: 0 10px 30px -10px rgb(0 0 0 / 0.6);
		white-space: nowrap;
	}

	.minimap {
		position: relative;
		border-left: 1px solid rgb(255 255 255 / 0.04);
	}
	.mini-row {
		display: flex;
		gap: 2px;
		height: 28px;
		align-items: center;
		padding-left: 8px;
		opacity: 0.55;
		transition: opacity 0.15s;
	}
	.mini-row.hot {
		opacity: 1;
	}
	.mini {
		height: 3px;
		border-radius: 1px;
		background: #4b5563;
	}
	.mini.kw {
		background: #fb923c;
	}
	.mini.str,
	.mini.ok {
		background: #86efac;
	}
	.mini.key {
		background: #c4b5fd;
	}
	.mini.var {
		background: #fcd34d;
	}
	.mini.type {
		background: #67e8f9;
	}
	.viewport {
		position: absolute;
		inset: 1rem 0.5rem 1rem 0;
		border-radius: 4px;
		background: rgb(255 255 255 / 0.03);
		border: 1px solid rgb(255 255 255 / 0.05);
		pointer-events: none;
	}

	.statusbar {
		color: #9ca3af;
		background: #0a0a0c;
		border-top: 1px solid rgb(255 255 255 / 0.06);
	}
	.seg {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.75rem;
		white-space: nowrap;
	}
	.seg.brand {
		color: white;
		background: #ea580c;
	}

	@media (prefers-reduced-motion: reduce) {
		.line {
			opacity: 1;
			transform: none;
			transition: none;
		}
		.caret {
			animation: none;
		}
	}
</style>
