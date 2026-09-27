<script lang="ts">
	import { inview } from '$lib/actions/inview';

	const {
		eyebrow,
		title,
		accent,
		description,
		align = 'center'
	}: {
		eyebrow: string;
		/** Plain part of the heading */
		title: string;
		/** Highlighted trailing word(s) of the heading */
		accent: string;
		description: string;
		align?: 'center' | 'left';
	} = $props();
</script>

<div
	use:inview
	data-inview="false"
	class="max-w-2xl {align === 'center' ? 'mx-auto text-center' : 'text-left'}"
>
	<p
		class="reveal-fade text-sm font-semibold tracking-[0.2em] text-brand-primary uppercase"
		style="--d: 0ms"
	>
		{eyebrow}
	</p>
	<h2 class="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
		<span class="reveal-line">
			<span style="--d: 80ms">{title} <span class="text-brand-primary">{accent}</span></span>
		</span>
	</h2>
	<p
		class="reveal-fade mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400"
		style="--d: 200ms"
	>
		{description}
	</p>
</div>
