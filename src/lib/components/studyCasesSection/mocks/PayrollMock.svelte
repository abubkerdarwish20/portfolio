<script lang="ts">
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import type { Step } from '../caseStudies';

	const { step = 0 }: { step?: Step } = $props();

	type Status = 'error' | 'pending' | 'sync' | 'ok';
	const label: Record<Status, string> = {
		error: 'Mismatch',
		pending: 'Pending',
		sync: 'Syncing',
		ok: 'Paid'
	};

	// Anonymous rows — initials and skeleton bars, no fabricated figures
	const rows = [
		{ initials: 'AK', name: 62, amount: 44 },
		{ initials: 'SR', name: 48, amount: 52 },
		{ initials: 'MN', name: 70, amount: 40 },
		{ initials: 'LH', name: 55, amount: 48 },
		{ initials: 'FT', name: 66, amount: 56 }
	];
	const byStep: Status[][] = [
		['error', 'pending', 'error', 'pending', 'error'],
		['ok', 'sync', 'sync', 'ok', 'sync'],
		['ok', 'ok', 'ok', 'ok', 'ok']
	];
	const header = [
		{ text: 'Mismatches found', cls: 'bad' },
		{ text: 'Reconciling…', cls: 'busy' },
		{ text: '0 errors', cls: 'good' }
	];
	const nodes = ['Payroll engine', 'General ledger', 'Bank file'];
</script>

<div class="mock rounded-2xl p-4 sm:p-5" data-step={step}>
	<div class="flex items-center justify-between">
		<div>
			<p class="text-sm font-semibold text-gray-900 dark:text-white">Payroll run</p>
			<p class="text-xs text-gray-500">Monthly · all employees</p>
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

	<ul class="mt-4 space-y-2">
		{#each rows as row, i (row.initials)}
			{@const status = byStep[step][i]}
			<li
				class="row flex items-center gap-3 rounded-xl px-3 py-2.5"
				data-status={status}
				style="--i: {i}"
			>
				<span
					class="avatar grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold"
					>{row.initials}</span
				>
				<span class="flex-1 space-y-1.5">
					<span class="bar block h-1.5 rounded-full" style="width: {row.name}%"></span>
					<span class="bar block h-1.5 rounded-full opacity-60" style="width: {row.amount * 0.6}%"
					></span>
				</span>
				<span
					class="badge inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold"
				>
					<span class="badge-dot size-1.5 rounded-full"></span>
					{label[status]}
				</span>
			</li>
		{/each}
	</ul>

	<!-- Integration flow lights up once the engine is in place -->
	<div class="flow mt-4 flex items-center" class:live={step >= 1} class:done={step === 2}>
		{#each nodes as node, i (node)}
			<span
				class="node rounded-lg px-1.5 py-1.5 text-center text-[10px] font-semibold whitespace-nowrap sm:px-2 sm:text-[11px]"
				style="--i: {i}"
			>
				{#if step === 2}<span class="check">✓</span>{/if}
				{node}
			</span>
			{#if i < nodes.length - 1}
				<span class="link relative mx-1 h-px flex-1"><span class="pulse"></span></span>
			{/if}
		{/each}
	</div>
</div>

<style>
	.mock {
		--red: #ef4444;
		--amber: #f59e0b;
		--green: #10b981;
		--blue: #3b82f6;
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

	.row {
		--c: var(--amber);
		background: #f9fafb;
		border: 1px solid transparent;
		transition:
			border-color 0.5s,
			background-color 0.5s,
			transform 0.5s var(--ease-out-expo);
		transition-delay: calc(var(--i) * 70ms);
	}
	:global(.dark) .row {
		background: rgb(255 255 255 / 0.03);
	}
	.row[data-status='error'] {
		--c: var(--red);
		border-color: color-mix(in srgb, var(--red) 30%, transparent);
		animation: shake 0.5s ease calc(var(--i) * 70ms);
	}
	.row[data-status='sync'] {
		--c: var(--blue);
	}
	.row[data-status='ok'] {
		--c: var(--green);
	}
	@keyframes shake {
		20%,
		60% {
			transform: translateX(-3px);
		}
		40%,
		80% {
			transform: translateX(3px);
		}
	}

	.avatar {
		background: color-mix(in srgb, var(--c) 14%, transparent);
		color: var(--c);
		transition:
			background-color 0.5s,
			color 0.5s;
		transition-delay: inherit;
	}
	.bar {
		background: rgb(229 231 235);
	}
	:global(.dark) .bar {
		background: rgb(255 255 255 / 0.1);
	}
	.badge {
		color: var(--c);
		background: color-mix(in srgb, var(--c) 12%, transparent);
		transition:
			color 0.5s,
			background-color 0.5s;
		transition-delay: inherit;
	}
	.badge-dot {
		background: var(--c);
	}
	.row[data-status='sync'] .badge-dot {
		animation: blink 0.9s ease-in-out infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0.2;
		}
	}

	.node {
		color: #6b7280;
		background: #f3f4f6;
		transition:
			color 0.4s,
			background-color 0.4s;
		transition-delay: calc(var(--i) * 150ms);
	}
	:global(.dark) .node {
		background: rgb(255 255 255 / 0.05);
		color: #9ca3af;
	}
	.flow.live .node {
		color: var(--blue);
		background: color-mix(in srgb, var(--blue) 12%, transparent);
	}
	.flow.done .node {
		color: var(--green);
		background: color-mix(in srgb, var(--green) 12%, transparent);
	}
	.link {
		background: rgb(229 231 235);
	}
	:global(.dark) .link {
		background: rgb(255 255 255 / 0.1);
	}
	.pulse {
		position: absolute;
		top: -2px;
		left: 0;
		width: 5px;
		height: 5px;
		border-radius: 9999px;
		background: var(--blue);
		opacity: 0;
	}
	.flow.live .pulse {
		animation: travel 1.4s linear infinite;
	}
	.flow.done .pulse {
		background: var(--green);
	}
	@keyframes travel {
		0% {
			left: 0;
			opacity: 0;
		}
		15%,
		85% {
			opacity: 1;
		}
		100% {
			left: calc(100% - 5px);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.row,
		.pulse,
		.badge-dot {
			animation: none !important;
		}
	}
</style>
