<script lang="ts">
	import SectionBackdrop from '$lib/components/SectionBackdrop.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import GitLog from './GitLog.svelte';
</script>

<section id="experience" class="scroll-section relative isolate py-20 md:py-28">
	<SectionBackdrop
		pattern="grid"
		glows={[
			{ x: 85, y: 35, color: '#3b82f6' },
			{ x: 10, y: 85, color: '#ea580c', w: 35, h: 40 }
		]}
	/>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			eyebrow="Career"
			title="My"
			accent="Experience"
			description="My professional journey and career milestones in the tech industry."
		/>
		<div class="mt-16">
			<GitLog />
		</div>
	</div>
</section>
