<script lang="ts">
	import SectionBackdrop from '$lib/components/SectionBackdrop.svelte';
	import { inview } from '$lib/actions/inview';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import SkillSphere from './SkillSphere.svelte';
	import SkillCategoryChips from './SkillCategoryChips.svelte';
	import type { Category } from './skills';

	let focus = $state<Category | null>(null);
</script>

<section id="skills" class="scroll-section relative isolate overflow-hidden py-20 md:py-28">
	<SectionBackdrop
		surface
		glows={[
			{ x: 12, y: 25, color: '#ea580c' },
			{ x: 88, y: 75, color: '#8b5cf6', w: 35, h: 45 }
		]}
	/>
	<div
		class="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8"
	>
		<div>
			<SectionHeader
				align="left"
				eyebrow="Toolbox"
				title="Technical"
				accent="Skills"
				description="I leverage a comprehensive stack of modern tools and frameworks to build scalable, high-performance web applications."
			/>
			<div use:inview data-inview="false" class="mt-10">
				<SkillCategoryChips bind:focus />
			</div>
		</div>

		<div use:inview data-inview="false" class="reveal-fade" style="--d: 200ms">
			<SkillSphere {focus} />
		</div>
	</div>
</section>
