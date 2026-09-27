<script lang="ts">
	import SectionBackdrop from '$lib/components/SectionBackdrop.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import CompareCard from './CompareCard.svelte';
	import { caseStudies } from './caseStudies';
</script>

<section id="case-studies" class="scroll-section relative isolate py-20 md:py-28">
	<SectionBackdrop
		surface
		pattern="dots"
		glows={[
			{ x: 22, y: 60, color: '#ea580c' },
			{ x: 78, y: 60, color: '#3b82f6' }
		]}
	/>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			eyebrow="Deep Dive"
			title="Case"
			accent="Studies"
			description="An in-depth look at how I tackle complex challenges, from initial problem definition to final deployed solution."
		/>
		<div class="mt-16 grid gap-6 lg:grid-cols-2">
			{#each caseStudies as study, i (study.id)}
				<CompareCard {study} index={i} />
			{/each}
		</div>
	</div>
</section>
