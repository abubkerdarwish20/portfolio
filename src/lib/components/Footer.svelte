<script lang="ts">
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { GithubIcon, Linkedin01Icon, Mail01Icon } from '@hugeicons/core-free-icons';
</script>

<footer
	class="relative z-10 border-t rounded-t-3xl border-white/20 bg-linear-to-r from-brand-primary to-accent-orange backdrop-blur-md pt-8 pb-6"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
			<div class="text-center md:text-left">
				<a
					class="text-2xl font-bold tracking-tight text-white flex items-center justify-center md:justify-start gap-1 mb-2"
					href="/"
				>
					Abubker<span class="text-black/50 dark:text-white/50">.</span>
				</a>
			</div>

			<p class="text-sm text-white/90">
				© {new Date().getFullYear()} Abubker. All rights reserved.
			</p>

			<div class="flex items-center gap-4">
				<a
					aria-label="GitHub"
					class="group p-2 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all duration-300"
					href="https://github.com/abubkerdarwish20"
					target="_blank"
					rel="noopener noreferrer"
				>
					<HugeiconsIcon
						icon={GithubIcon}
						size={20}
						className="text-white/90 group-hover:text-white transition-colors"
					/>
				</a>
				<a
					aria-label="LinkedIn"
					class="group p-2 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all duration-300"
					href="https://www.linkedin.com/in/abubker-darwish/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<HugeiconsIcon
						icon={Linkedin01Icon}
						size={20}
						className="text-white/90 group-hover:text-white transition-colors"
					/>
				</a>
				<a
					aria-label="Email"
					class="group p-2 rounded-full border border-white/20 hover:border-white hover:bg-white/10 transition-all duration-300"
					href="mailto:abubker.darwish@gmail.com"
				>
					<HugeiconsIcon
						icon={Mail01Icon}
						size={20}
						className="text-white/90 group-hover:text-white transition-colors"
					/>
				</a>
			</div>
		</div>
	</div>
</footer>
