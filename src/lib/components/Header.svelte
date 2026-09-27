<script lang="ts">
	import { fly } from 'svelte/transition';
	import { expoOut, cubicIn } from 'svelte/easing';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { Download01Icon } from '@hugeicons/core-free-icons';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { navItems } from '$lib/nav';
	import { contact } from '$lib/components/contactSection/contact';
	import { ScrollState } from './header/scroll.svelte';

	const scroll = new ScrollState();
	$effect(() => scroll.start());

	let hovering = $state(false);
	let pinned = $state(false); // tapped open (touch / keyboard)
	let full: HTMLElement;
	let fullWidth = $state(640);

	// Open at the top of the page, on hover, or when tapped; collapsed while reading
	const expanded = $derived(!scroll.scrolled || hovering || pinned);
	const current = $derived(navItems.find((n) => n.id === scroll.active) ?? navItems[0]);
	const index = $derived(navItems.findIndex((n) => n.id === scroll.active));

	const COLLAPSED = 232;
	const R = 9;
	const C = 2 * Math.PI * R;

	// Measure right away (ResizeObserver only reports after the next frame), then keep in sync
	$effect(() => {
		const measure = () => (fullWidth = full.scrollWidth);
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(full);
		return () => ro.disconnect();
	});

	$effect(() => {
		if (!pinned) return;
		const close = (e: PointerEvent) => {
			if (!(e.target as HTMLElement).closest('.island')) pinned = false;
		};
		addEventListener('pointerdown', close);
		return () => removeEventListener('pointerdown', close);
	});

	function rollIn(_node: Element) {
		return {
			duration: 450,
			easing: expoOut,
			css: (t: number) => `transform: translateY(${(1 - t) * 100}%); opacity: ${t}`
		};
	}
	function rollOut(_node: Element) {
		return {
			duration: 250,
			easing: cubicIn,
			css: (t: number) => `transform: translateY(${(t - 1) * 100}%); opacity: ${t}`
		};
	}
</script>

<header class="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
	<div
		class="island relative overflow-hidden rounded-[1.75rem]"
		class:open={expanded}
		style="width: min(calc(100vw - 2rem), {expanded ? fullWidth : COLLAPSED}px)"
		role="navigation"
		aria-label="Main"
		onpointerenter={(e) => e.pointerType === 'mouse' && (hovering = true)}
		onpointerleave={() => (hovering = false)}
	>
		<!-- Collapsed face: current section + progress ring -->
		<button
			type="button"
			class="face absolute inset-0 flex cursor-pointer items-center gap-3 pr-2 pl-4 lg:pointer-events-none"
			class:hide={expanded}
			aria-label="Open navigation — current section {current.label}"
			aria-expanded={expanded}
			onclick={() => (pinned = true)}
		>
			<span class="logo shrink-0 font-bold">A<span class="text-brand-primary">.</span></span>
			<span class="h-4 w-px bg-white/15"></span>
			<span
				class="relative grid h-6 flex-1 overflow-hidden text-left text-sm font-medium text-white"
			>
				{#key current.id}
					<span class="col-start-1 row-start-1 truncate" in:rollIn out:rollOut>
						<span class="font-mono text-xs text-white/40">0{index + 1}</span>
						{current.label}
					</span>
				{/key}
			</span>
			<svg class="size-8 shrink-0 -rotate-90" viewBox="0 0 24 24" aria-hidden="true">
				<circle
					cx="12"
					cy="12"
					r={R}
					fill="none"
					stroke="rgb(255 255 255 / 0.15)"
					stroke-width="2.5"
				/>
				<circle
					cx="12"
					cy="12"
					r={R}
					fill="none"
					stroke="#ea580c"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-dasharray={C}
					stroke-dashoffset={C * (1 - scroll.progress)}
				/>
			</svg>
		</button>

		<!-- Expanded face: full navigation -->
		<div
			bind:this={full}
			class="body flex w-max items-center gap-1 py-1.5 pr-1.5 pl-5"
			class:show={expanded}
			inert={!expanded}
		>
			<a href="#home" class="logo mr-3 shrink-0 text-lg font-bold"
				>Abubker<span class="text-brand-primary">.</span></a
			>
			<div class="hidden items-center lg:flex">
				{#each navItems as item (item.id)}
					<a
						href={item.href}
						class="link rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap"
						class:on={scroll.active === item.id}
						aria-current={scroll.active === item.id ? 'true' : undefined}
						onclick={() => (pinned = false)}>{item.label}</a
					>
				{/each}
			</div>
			<a
				href={contact.cv}
				download="abubker-darwish-cv.pdf"
				class="ml-2 hidden items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold whitespace-nowrap text-white sm:flex"
			>
				<HugeiconsIcon icon={Download01Icon} size={16} /> Resume
			</a>
			<span class="ml-1"><ThemeToggle /></span>
		</div>

		<!-- Touch: sections drop down inside the island -->
		{#if pinned}
			<ul class="grid gap-1 px-3 pb-3 lg:hidden" transition:fly={{ y: -8, duration: 300 }}>
				{#each navItems as item, i (item.id)}
					<li>
						<a
							href={item.href}
							class="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-white/90 {scroll.active ===
							item.id
								? 'bg-white/10'
								: ''}"
							onclick={() => (pinned = false)}
						>
							<span class="font-mono text-xs text-white/40">0{i + 1}</span>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</header>

<style>
	/* Always dark, like a device island — reads well over both themes */
	.island {
		height: 3.25rem;
		background: #0b0b0e;
		border: 1px solid rgb(255 255 255 / 0.08);
		box-shadow: 0 16px 40px -18px rgb(0 0 0 / 0.6);
		transition:
			width 0.7s var(--ease-out-expo),
			height 0.5s var(--ease-out-expo),
			border-radius 0.5s var(--ease-out-expo);
	}
	.island:has(ul) {
		height: auto;
	}
	.logo {
		color: white;
	}
	.face {
		transition:
			opacity 0.3s,
			transform 0.5s var(--ease-out-expo);
	}
	.face.hide {
		opacity: 0;
		transform: scale(0.96);
		pointer-events: none;
	}
	.body {
		opacity: 0;
		transform: scale(0.98);
		transition:
			opacity 0.35s 0.1s,
			transform 0.5s var(--ease-out-expo);
	}
	.body.show {
		opacity: 1;
		transform: none;
	}
	.link {
		color: rgb(255 255 255 / 0.7);
		transition:
			color 0.2s,
			background-color 0.2s;
	}
	.link:hover {
		color: white;
		background: rgb(255 255 255 / 0.07);
	}
	.link.on {
		color: white;
		background: rgb(234 88 12 / 0.9);
	}

	@media (prefers-reduced-motion: reduce) {
		.island,
		.face,
		.body {
			transition: none;
		}
	}
</style>
