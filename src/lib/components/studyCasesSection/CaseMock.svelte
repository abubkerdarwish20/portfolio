<script lang="ts">
	import PayrollMock from './mocks/PayrollMock.svelte';
	import InfraMock from './mocks/InfraMock.svelte';
	import type { CaseStudy, Step } from './caseStudies';

	const { id, step = 0 }: { id: CaseStudy['id']; step?: Step } = $props();
</script>

{#if id === 'payroll'}
	<PayrollMock {step} />
{:else}
	<InfraMock {step} />
{/if}
