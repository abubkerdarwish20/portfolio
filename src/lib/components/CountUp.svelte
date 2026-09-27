<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { expoOut } from 'svelte/easing';

	const {
		value,
		decimals = 0,
		active = true,
		duration = 1600
	}: { value: number; decimals?: number; active?: boolean; duration?: number } = $props();

	const tween = new Tween(0, { easing: expoOut });

	$effect(() => {
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		tween.set(active ? value : 0, { duration: reduce ? 0 : duration });
	});
</script>

<span class="tabular-nums">{tween.current.toFixed(decimals)}</span>
