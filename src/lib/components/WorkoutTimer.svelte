<script lang="ts">
	import { started } from '$lib/stores';
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import { formatTime } from '$lib/functions';
	import { Timer } from '$lib/classes/Timer';


	// create a timer with a 1 second interval
	let interval = 5;
	let seconds: Tweened<number> | number; // number allowed to can set to 0 when countdown undefined
	export let countdown: Timer | undefined; // countdown is undefined until started
	let formattedSeconds: string;

/* 	// when timer is started, run the timer
	$: if ($started) {
		countdown = new Timer(interval);
		// set $started to false when timer is finished
		countdown.start();
	} */

	$: if (countdown) {
		countdown.timer.subscribe((value) => {
			seconds = value;
			// format tweened seconds as string with 0 dp
			formattedSeconds = seconds.toFixed(0);
		});
	} else {
		seconds = 0;
	}

	// set started to false when seconds is 0
	$: if (seconds === 0) {
		started.set(false);
	}

</script>



<p>{formattedSeconds}</p>

<h2>Todo</h2>
<ul>
	<li class="done">format seconds</li>
	<li class="done">add total number of intervals</li>
	<li >tally intervals</li>
	<li>fire off timers when intervals start</li>
	<li>progress bar</li>
	<li>rest / work types to control direction of progress</li>
</ul>

<style>
	.done {
		text-decoration: line-through;
	}
</style>