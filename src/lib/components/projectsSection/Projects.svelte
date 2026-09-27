<script lang="ts">
	import SectionBackdrop from '$lib/components/SectionBackdrop.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import ProjectCard from './ProjectCard.svelte';
	import { projects } from './projects';

	const TOP = 112;
	const OFFSET = 28;
	const wrappers: HTMLDivElement[] = [];
	let covered = $state(projects.map(() => 0));
	let enter = $state(projects.map(() => 1));

	// One scroll pass per frame measures every card:
	// `enter` — how far it has risen into its pinned slot; `covered` — how far the next card overlaps it
	$effect(() => {
		let frame = 0;
		const update = () => {
			frame = 0;
			const stacked = matchMedia('(min-width: 1024px)').matches;
			const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
			const tops = wrappers.map((w) => w.getBoundingClientRect().top);

			enter = tops.map((top, i) => {
				if (reduce) return 1;
				const slot = TOP + i * OFFSET;
				return Math.min(1, Math.max(0, 1 - (top - slot) / (innerHeight - slot)));
			});
			covered = wrappers.map((w, i) => {
				const next = tops[i + 1];
				if (!stacked || next === undefined) return 0;
				const distance = next - (TOP + i * OFFSET);
				return Math.min(1, Math.max(0, 1 - distance / w.offsetHeight));
			});
		};
		const onScroll = () => (frame ||= requestAnimationFrame(update));
		update();
		addEventListener('scroll', onScroll, { passive: true });
		addEventListener('resize', onScroll);
		return () => {
			cancelAnimationFrame(frame);
			removeEventListener('scroll', onScroll);
			removeEventListener('resize', onScroll);
		};
	});
</script>

<section id="projects" class="scroll-section relative isolate py-20 md:py-28">
	<SectionBackdrop
		glows={[
			{ x: 50, y: 0, color: '#ea580c', w: 60, h: 30 },
			{ x: 90, y: 92, color: '#3b82f6', w: 35, h: 30 }
		]}
	/>
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<SectionHeader
			eyebrow="Selected Work"
			title="Featured"
			accent="Projects"
			description="Check out some of the recent projects I've worked on, showcasing my skills in web development."
		/>

		<div class="mt-16 space-y-8 lg:space-y-[18vh]">
			{#each projects as project, i (project.id)}
				<div bind:this={wrappers[i]} class="lg:sticky" style="top: {TOP + i * OFFSET}px">
					<ProjectCard
						{project}
						index={i}
						total={projects.length}
						enter={enter[i]}
						covered={covered[i]}
					/>
				</div>
			{/each}
			<!-- Sticky children stay inside the parent's content box (padding doesn't count),
			     so a real spacer lets the last card settle over the previous one before release -->
			<div class="hidden h-[12vh] lg:block" aria-hidden="true"></div>
		</div>
	</div>
</section>
