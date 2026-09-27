<script lang="ts">
	import type { Snippet } from 'svelte';

	const { url, children }: { url: string; children: Snippet } = $props();

	const display = $derived(url.replace(/^https?:\/\//, '').replace(/\/$/, ''));
</script>

<div class="frame overflow-hidden rounded-2xl">
	<div class="bar flex items-center gap-3 px-3 py-2.5 sm:px-4">
		<div class="flex shrink-0 gap-1.5" aria-hidden="true">
			<span class="light bg-[#ff5f57]"></span>
			<span class="light bg-[#febc2e]"></span>
			<span class="light bg-[#28c840]"></span>
		</div>
		<div
			class="url flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1 text-[11px]"
		>
			<svg viewBox="0 0 16 16" class="size-3 shrink-0 opacity-60" aria-hidden="true">
				<path
					fill="currentColor"
					d="M4 7V5a4 4 0 1 1 8 0v2h.5A1.5 1.5 0 0 1 14 8.5v5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5v-5A1.5 1.5 0 0 1 3.5 7H4Zm1.5 0h5V5a2.5 2.5 0 0 0-5 0v2Z"
				/>
			</svg>
			<span class="truncate">{display}</span>
		</div>
		<span class="w-[42px] shrink-0" aria-hidden="true"></span>
	</div>
	<div class="relative overflow-hidden">
		{@render children()}
	</div>
</div>

<style>
	.frame {
		background: white;
		border: 1px solid rgb(229 231 235);
		box-shadow: 0 30px 60px -30px rgb(0 0 0 / 0.3);
	}
	:global(.dark) .frame {
		background: #16161a;
		border-color: rgb(255 255 255 / 0.08);
	}
	.bar {
		border-bottom: 1px solid rgb(229 231 235);
		background: #f9fafb;
	}
	:global(.dark) .bar {
		border-color: rgb(255 255 255 / 0.06);
		background: #1c1c20;
	}
	.light {
		width: 10px;
		height: 10px;
		border-radius: 9999px;
	}
	.url {
		color: #6b7280;
		background: white;
		border: 1px solid rgb(229 231 235);
	}
	:global(.dark) .url {
		color: #9ca3af;
		background: rgb(255 255 255 / 0.05);
		border-color: rgb(255 255 255 / 0.06);
	}
</style>
