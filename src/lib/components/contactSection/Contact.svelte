<script lang="ts">
	import SectionBackdrop from '$lib/components/SectionBackdrop.svelte';
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import {
		Mail01Icon,
		Copy01Icon,
		CallIcon,
		GithubIcon,
		Linkedin01Icon,
		Download01Icon,
		Search01Icon,
		CheckmarkCircle01Icon
	} from '@hugeicons/core-free-icons';
	import { inview } from '$lib/actions/inview';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import { contact, mailto } from './contact';
	import { LocalClock } from './clock.svelte';
	import { Copier } from './copy.svelte';

	type Command = {
		id: string;
		group: string;
		label: string;
		hint: string;
		keywords: string;
		icon: typeof Mail01Icon;
		run: () => void;
	};

	const clock = new LocalClock();
	const copier = new Copier();

	const open = (url: string) => window.open(url, '_blank', 'noopener');
	const commands: Command[] = [
		{
			id: 'email',
			group: 'Contact',
			label: 'Send an email',
			hint: contact.email,
			keywords: 'mail message hire write',
			icon: Mail01Icon,
			run: () => (location.href = mailto())
		},
		{
			id: 'copy',
			group: 'Contact',
			label: 'Copy email address',
			hint: 'to clipboard',
			keywords: 'copy mail clipboard',
			icon: Copy01Icon,
			run: () => copier.copy(contact.email, 'email')
		},
		{
			id: 'call',
			group: 'Contact',
			label: 'Call me',
			hint: contact.phone.display,
			keywords: 'phone call tel',
			icon: CallIcon,
			run: () => (location.href = contact.phone.href)
		},
		{
			id: 'github',
			group: 'Profiles',
			label: 'GitHub',
			hint: 'abubkerdarwish20',
			keywords: 'code source repos',
			icon: GithubIcon,
			run: () => open(contact.github)
		},
		{
			id: 'linkedin',
			group: 'Profiles',
			label: 'LinkedIn',
			hint: 'in/abubker-darwish',
			keywords: 'profile network career',
			icon: Linkedin01Icon,
			run: () => open(contact.linkedin)
		},
		{
			id: 'cv',
			group: 'Resume',
			label: 'Download resume',
			hint: 'PDF',
			keywords: 'cv resume pdf download',
			icon: Download01Icon,
			run: () => {
				const a = Object.assign(document.createElement('a'), {
					href: contact.cv,
					download: 'abubker-darwish-cv.pdf'
				});
				a.click();
			}
		}
	];

	let query = $state('');
	let active = $state(0);
	let input: HTMLInputElement;
	let palette: HTMLElement;
	let demo = true;

	const results = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return q
			? commands.filter((c) => `${c.label} ${c.hint} ${c.keywords}`.toLowerCase().includes(q))
			: commands;
	});
	const groups = $derived([...new Set(results.map((c) => c.group))]);

	$effect(() => {
		// Keep the highlight inside the filtered list
		if (active >= results.length) active = Math.max(0, results.length - 1);
	});

	// First real interaction stops the demo and wipes whatever it had half-typed
	function takeOver() {
		if (!demo) return;
		demo = false;
		query = '';
	}

	function onkeydown(e: KeyboardEvent) {
		takeOver();
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			active = (active + 1) % Math.max(1, results.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			active = (active - 1 + results.length) % Math.max(1, results.length);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			results[active]?.run();
		} else if (e.key === 'Escape') {
			query = '';
		}
	}

	// ⌘K / Ctrl+K anywhere on the page jumps into the palette
	$effect(() => {
		const onGlobal = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
				e.preventDefault();
				takeOver();
				palette.scrollIntoView({ behavior: 'smooth', block: 'center' });
				input.focus({ preventScroll: true });
			}
		};
		addEventListener('keydown', onGlobal);
		return () => removeEventListener('keydown', onGlobal);
	});

	$effect(() => clock.start());

	// Show the shortcut the visitor will actually press
	let shortcut = $state('⌘K');
	$effect(() => {
		if (!/Mac|iPhone|iPad/.test(navigator.userAgent)) shortcut = 'Ctrl K';
	});

	// Self-demo: types a couple of queries until the visitor touches anything
	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
	async function playDemo() {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		for (const word of ['copy', 'linkedin', 'resume']) {
			for (const ch of word) {
				if (!demo) return;
				query += ch;
				await sleep(90);
			}
			await sleep(1400);
			while (query && demo) {
				query = query.slice(0, -1);
				await sleep(40);
			}
			await sleep(400);
		}
		if (demo) query = '';
	}
</script>

<section id="contact" class="scroll-section relative isolate py-20 md:py-28">
	<SectionBackdrop
		surface
		pattern="grid"
		glows={[
			{ x: 75, y: 45, color: '#ea580c' },
			{ x: 15, y: 85, color: '#f59e0b', w: 35, h: 40 }
		]}
	/>
	<div
		class="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8"
	>
		<div>
			<SectionHeader
				align="left"
				eyebrow="Contact"
				title="Let's Connect &"
				accent="Collaborate"
				description="I'm currently available for freelance work and open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
			/>

			<div
				class="status mt-8 inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm"
				class:online={clock.online}
			>
				<span class="relative flex size-2.5">
					{#if clock.online}<span
							class="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75"
						></span>{/if}
					<span class="dot relative size-2.5 rounded-full"></span>
				</span>
				<span class="text-gray-700 dark:text-gray-300">
					{clock.online ? 'Online now' : 'Offline'} in Mukalla ·
					<span class="font-mono font-semibold text-gray-900 tabular-nums dark:text-white"
						>{clock.time}</span
					>
					<span class="text-gray-400">({clock.offset})</span>
				</span>
			</div>
			<p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
				Working hours: {contact.hours.label}. Messages outside them get a reply the next working
				day.
			</p>
		</div>

		<div
			bind:this={palette}
			use:inview={{ onenter: playDemo }}
			data-inview="false"
			class="palette reveal-fade relative overflow-hidden rounded-2xl"
			style="--d: 150ms"
			role="presentation"
			onpointerdown={takeOver}
		>
			<div class="flex items-center gap-3 border-b border-white/5 px-4 py-3.5">
				<HugeiconsIcon icon={Search01Icon} size={18} className="shrink-0 text-gray-500" />
				<input
					bind:this={input}
					bind:value={query}
					{onkeydown}
					onfocus={takeOver}
					class="min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder:text-gray-500 focus:outline-none"
					placeholder="Type a command or search…"
					aria-label="Search contact options"
					role="combobox"
					aria-expanded="true"
					aria-controls="contact-commands"
					aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
				/>
				<kbd class="kbd">{shortcut}</kbd>
			</div>

			<div id="contact-commands" class="h-[400px] overflow-y-auto p-2" role="listbox">
				{#each groups as group (group)}
					<p
						class="px-3 pt-3 pb-1.5 text-[11px] font-semibold tracking-wider text-gray-500 uppercase"
					>
						{group}
					</p>
					{#each results.filter((c) => c.group === group) as cmd (cmd.id)}
						{@const i = results.indexOf(cmd)}
						<button
							id="cmd-{cmd.id}"
							type="button"
							role="option"
							aria-selected={i === active}
							class="item flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left"
							class:active={i === active}
							onmouseenter={() => (active = i)}
							onclick={() => {
								takeOver();
								cmd.run();
							}}
						>
							<span class="icon grid size-8 shrink-0 place-items-center rounded-lg">
								{#if cmd.id === 'copy' && copier.copied === 'email'}
									<HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} />
								{:else}
									<HugeiconsIcon icon={cmd.icon} size={16} />
								{/if}
							</span>
							<span class="flex-1 text-sm font-medium text-gray-100">
								{cmd.id === 'copy' && copier.copied === 'email' ? 'Copied to clipboard' : cmd.label}
							</span>
							<span class="hidden truncate text-xs text-gray-500 sm:block">{cmd.hint}</span>
							<span class="enter kbd" aria-hidden="true">↵</span>
						</button>
					{/each}
				{:else}
					<p class="px-3 py-10 text-center text-sm text-gray-500">
						No results for “{query}” — try
						<button
							type="button"
							class="text-brand-primary underline"
							onclick={() => (query = 'email')}>email</button
						>
					</p>
				{/each}
			</div>

			<div
				class="flex items-center gap-4 border-t border-white/5 px-4 py-2.5 text-[11px] text-gray-500"
			>
				<span><kbd class="kbd">↑</kbd> <kbd class="kbd">↓</kbd> navigate</span>
				<span><kbd class="kbd">↵</kbd> select</span>
				<span class="hidden sm:inline"><kbd class="kbd">esc</kbd> clear</span>
				{#if copier.copied}
					<span
						class="ml-auto text-emerald-400"
						transition:fly={{ y: 6, duration: 300, easing: expoOut }}>✓ Copied {contact.email}</span
					>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.palette {
		background: #0d0d10;
		border: 1px solid rgb(255 255 255 / 0.08);
		box-shadow:
			0 40px 80px -30px rgb(0 0 0 / 0.55),
			0 0 0 1px rgb(234 88 12 / 0.06);
	}
	.palette::before {
		content: '';
		position: absolute;
		inset: -40% -20% auto auto;
		width: 60%;
		height: 80%;
		background: radial-gradient(circle, rgb(234 88 12 / 0.16), transparent 65%);
		pointer-events: none;
	}
	.item {
		transition: background-color 0.15s;
	}
	.item.active {
		background: rgb(255 255 255 / 0.06);
	}
	.icon {
		color: #9ca3af;
		background: rgb(255 255 255 / 0.05);
		transition:
			color 0.2s,
			background-color 0.2s;
	}
	.item.active .icon {
		color: white;
		background: #ea580c;
	}
	.enter {
		opacity: 0;
		transition: opacity 0.15s;
	}
	.item.active .enter {
		opacity: 1;
	}
	.kbd {
		display: inline-grid;
		place-items: center;
		min-width: 1.4rem;
		padding: 0.1rem 0.35rem;
		border-radius: 0.375rem;
		border: 1px solid rgb(255 255 255 / 0.1);
		background: rgb(255 255 255 / 0.04);
		color: #9ca3af;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 10px;
	}

	.status {
		background: rgb(0 0 0 / 0.03);
		border: 1px solid rgb(229 231 235);
	}
	:global(.dark) .status {
		background: rgb(255 255 255 / 0.03);
		border-color: rgb(255 255 255 / 0.08);
	}
	.dot {
		background: #9ca3af;
	}
	.status.online .dot {
		background: #10b981;
	}
</style>
