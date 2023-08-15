<!-- script -->
<script lang="ts">
	//  imports
	import Timer from './Timer.svelte';
	import Rest from './Rest.svelte';
	import { tweened } from 'svelte/motion';
    import { started } from '$lib/stores';

	// props
	export let Title: string = '';
	export let Exercise: string = '';
	export let interval: number = 0;

    // tweened variable to count down from interval seconds
	const time = tweened(0);

        // start the timer, converting interval to ms
    function startTimer() {
        time.set(0);
        time.set(interval, {
            duration: interval*1000
        });
    }

    // call startTimer when started=true
    $: sessionStarted = $started;
    $: if (sessionStarted) {
        startTimer();
    }


</script>

<!-- html -->

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
