<script lang="ts">
	/**
	 * Per-section atmosphere: an optional tinted surface, soft color glows, a faint pattern
	 * and a top hairline. Pure CSS backgrounds (no blur, nothing positioned outside the section),
	 * so it's cheap to paint and can never widen the page. Place it as the first child of a
	 * `relative isolate` section.
	 */
	type Glow = {
		/** Center, in % of the section box */
		x: number;
		y: number;
		color: string;
		/** Ellipse radii, in % of the section box */
		w?: number;
		h?: number;
	};

	const {
		surface = false,
		glows = [],
		pattern = 'none',
		divider = true
	}: {
		surface?: boolean;
		glows?: Glow[];
		pattern?: 'none' | 'grid' | 'dots';
		divider?: boolean;
	} = $props();

	const glowLayer = $derived(
		glows
			.map(
				(g) =>
					`radial-gradient(ellipse ${g.w ?? 45}% ${g.h ?? 55}% at ${g.x}% ${g.y}%, color-mix(in srgb, ${g.color} var(--glow-pct), transparent), transparent 70%)`
			)
			.join(', ')
	);
</script>

<div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
	{#if surface}<div class="surface absolute inset-0"></div>{/if}
	{#if pattern !== 'none'}<div class="pattern {pattern} absolute inset-0"></div>{/if}
	{#if glows.length}<div class="absolute inset-0" style="background: {glowLayer}"></div>{/if}
	{#if divider}<div class="divider absolute inset-x-0 top-0 h-px"></div>{/if}
</div>

<style>
	/* Tinted band that fades in and out, so neighbouring sections blend instead of butting */
	.surface {
		background: linear-gradient(
			to bottom,
			transparent,
			var(--surface) 14%,
			var(--surface) 86%,
			transparent
		);
	}
	.pattern {
		mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, #000 20%, transparent 75%);
	}
	.pattern.grid {
		background-image:
			linear-gradient(to right, var(--pattern-ink) 1px, transparent 1px),
			linear-gradient(to bottom, var(--pattern-ink) 1px, transparent 1px);
		background-size: 56px 56px;
	}
	.pattern.dots {
		background-image: radial-gradient(var(--pattern-ink) 1.2px, transparent 1.2px);
		background-size: 22px 22px;
	}
	/* Hairline that fades at both ends with a warm glint in the middle */
	.divider {
		background: linear-gradient(
			90deg,
			transparent,
			var(--hairline) 20%,
			color-mix(in srgb, #ea580c 45%, transparent) 50%,
			var(--hairline) 80%,
			transparent
		);
	}
</style>
