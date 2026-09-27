<script lang="ts">
	import { Spring } from 'svelte/motion';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { GithubIcon, Linkedin01Icon, Mail01Icon } from '@hugeicons/core-free-icons';
	import HeroCopy from './HeroCopy.svelte';
	import CodeStage from './CodeStage.svelte';
	import DotField from './DotField.svelte';

	const socials = [
		{ href: 'https://github.com/abubkerdarwish20', label: 'GitHub Profile', icon: GithubIcon },
		{
			href: 'https://www.linkedin.com/in/abubker-darwish/',
			label: 'LinkedIn Profile',
			icon: Linkedin01Icon
		},
		{ href: 'mailto:abubker.darwish@gmail.com', label: 'Email', icon: Mail01Icon }
	];

	const tilt = new Spring({ x: 0, y: 0 }, { stiffness: 0.06, damping: 0.45 });

	function onpointermove(e: PointerEvent) {
		const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
		tilt.target = {
			x: (e.clientX - r.left) / r.width - 0.5,
			y: (e.clientY - r.top) / r.height - 0.5
		};
	}
</script>

<section
	id="home"
	class="scroll-section relative flex min-h-svh items-center overflow-hidden px-4 pt-32 pb-16 sm:px-6 lg:px-8"
	{onpointermove}
	onpointerleave={() => (tilt.target = { x: 0, y: 0 })}
>
	<DotField />
	<div class="bg-hero-glow-light dark:bg-hero-glow pointer-events-none absolute inset-0"></div>

	<div
		class="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2"
	>
		<HeroCopy />
		<div class="reveal-fade min-w-0" style="--d: 350ms">
			<CodeStage tilt={tilt.current} />
		</div>
	</div>

	<div class="absolute bottom-10 left-6 z-20 hidden flex-col items-center gap-6 xl:flex">
		<div class="h-20 w-px bg-linear-to-b from-transparent to-gray-400 dark:to-gray-600"></div>
		{#each socials as s (s.href)}
			<a
				class="text-gray-400 transition-[color,translate] duration-300 hover:-translate-y-1 hover:text-brand-primary"
				href={s.href}
				target={s.href.startsWith('http') ? '_blank' : undefined}
				rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
				aria-label={s.label}
			>
				<HugeiconsIcon icon={s.icon} size={20} />
			</a>
		{/each}
	</div>
</section>
