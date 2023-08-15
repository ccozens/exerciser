<!-- script -->
<script lang="ts">
	//  imports
	import Timer from './Timer.svelte';
	import Rest from './Rest.svelte';
	import { tweened } from 'svelte/motion';


	// props
	export let Title: string = '';
	export let Exercise: string = '';
	export let interval: number = 0;

    // convert interval to milliseconds
    const intervalMs: number = interval * 1000;

    // tweened variable to count down from interval seconds
	const time = tweened(0, {
		duration: intervalMs
	});
    // set the time to the interval
	function setTime(event: CustomEvent<number>) {
		time.set(intervalMs);
        console.log('setTime');
	}

</script>

<!-- html -->

<Timer {interval} {time} on:startSession={setTime} />

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
