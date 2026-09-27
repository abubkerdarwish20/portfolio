<script lang="ts">
	import { categories, byCategory, type Category } from './skills';

	let { focus = $bindable(null) }: { focus?: Category | null } = $props();
</script>

<div class="flex flex-wrap gap-2.5">
	{#each categories as c, i (c.id)}
		{@const items = byCategory(c.id)}
		<button
			type="button"
			class="chip reveal-fade group flex cursor-pointer items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-semibold"
			class:active={focus === c.id}
			style="--d: {250 + i * 70}ms"
			onmouseenter={() => (focus = c.id)}
			onmouseleave={() => (focus = null)}
			onfocus={() => (focus = c.id)}
			onblur={() => (focus = null)}
		>
			<span class="flex -space-x-2">
				{#each items.slice(0, 3) as s, k (s.name)}
					<span class="mini grid size-7 place-items-center rounded-full" style="--k: {k}">
						<img src={s.icon} alt="" class="size-4 {s.invertOnDark ? 'dark:invert' : ''}" />
					</span>
				{/each}
			</span>
			{c.label}
			<span class="count text-xs tabular-nums">{items.length}</span>
		</button>
	{/each}
</div>

<style>
	.chip {
		border: 1px solid rgb(229 231 235);
		background: rgb(255 255 255 / 0.7);
		color: #374151;
		transition:
			background-color 0.35s var(--ease-out-expo),
			border-color 0.35s,
			color 0.35s,
			transform 0.35s var(--ease-out-expo);
	}
	:global(.dark) .chip {
		border-color: rgb(255 255 255 / 0.1);
		background: rgb(255 255 255 / 0.03);
		color: #d1d5db;
	}
	.chip:hover {
		transform: translateY(-2px);
	}
	.chip.active,
	:global(.dark) .chip.active {
		background: #ea580c;
		border-color: #ea580c;
		color: white;
		box-shadow: 0 10px 24px -10px rgb(234 88 12 / 0.7);
	}

	.mini {
		background: white;
		border: 2px solid white;
		box-shadow: 0 1px 3px rgb(0 0 0 / 0.12);
		transition: transform 0.4s var(--ease-out-expo);
		transition-delay: calc(var(--k) * 40ms);
	}
	:global(.dark) .mini {
		background: #1c1c20;
		border-color: #0b0b0e;
	}
	/* The stacked icons fan out on hover */
	.chip:hover .mini {
		transform: translateX(calc(var(--k) * 5px));
	}
	.chip.active .mini,
	:global(.dark) .chip.active .mini {
		border-color: #ea580c;
	}

	.count {
		opacity: 0.55;
	}
	.chip.active .count {
		opacity: 0.85;
	}
</style>
