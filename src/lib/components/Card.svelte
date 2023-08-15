<!-- script -->
<script lang="ts">
	//  imports
	import Timer from './Timer.svelte';
    import Start from './Start.svelte';
	import Rest from './Rest.svelte';
	import { tweened } from 'svelte/motion';
    import { started } from '$lib/stores';

    function setStarted() {
        started.set(true);
    }

    $: console.log('started', $started);

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
	function setTime() {
		time.set(intervalMs);
        console.log('setTime');
	}

    function testFn() {
        console.log('testFn');
    }

</script>

<!-- html -->

<Start on:startSession={setStarted} />
<button on:click={() => started.set(false)}>Stop</button>
<Timer {interval} {time}  />

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
