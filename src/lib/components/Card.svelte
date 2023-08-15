<!-- script -->
<script lang="ts">
	//  imports
	import Timer from './Timer.svelte';
	import Rest from './Rest.svelte';
    import { started } from '$lib/stores';

	// props
	export let Title: string = '';
	export let Exercise: string = '';
	export let interval: number = 0;





</script>

<!-- html -->


<div class="card">
	<slot {Title} {Exercise} />
</div>

<!-- <Rest /> -->

<!-- style -->
<style lang="postcss">
	.card {
		background-color: var(--color-white);
		border-radius: 0.5rem;
		box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
		padding: 1rem;
	}
</style>
