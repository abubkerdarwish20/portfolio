<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
	<h1 class="text-4xl font-bold tracking-tight text-foreground">SvelteKit + shadcn-svelte</h1>
	<p class="text-muted-foreground">
		Successfully initialized with Tailwind, ESLint, Prettier, and Husky.
	</p>
	<div class="flex gap-4">
		<Button>Click Me</Button>
		<Button variant="outline">Secondary Action</Button>
	</div>
</div>
