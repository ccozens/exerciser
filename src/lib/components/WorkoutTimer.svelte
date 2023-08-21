<script lang="ts">
	import { started } from '$lib/stores';
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import { formatTime } from '$lib/functions';

	// constructor to create timer that counts down from interval to zero when created, using set interval to subtract 1 every second without using tweened
	class Timer {
		interval: number;
		timer: Tweened<number>;
		constructor(interval: number) {
			this.interval = interval;
			this.timer = tweened(interval, {
				duration: interval * 1000,
				// easing: (t) => t
			});
		}

		start() {
			this.timer.set(0);
		}
	}



	// create a timer with a 1 second interval
	let interval = 5;
	let seconds: Tweened<number> | number; // number allowed to can set to 0 when countdown undefined
	let countdown: Timer;
	let formattedSeconds: string;

	// when timer is started, run the timer
	$: if ($started) {
		countdown = new Timer(interval);
		// set $started to false when timer is finished
		countdown.start();
	}

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

<button on:click={() => started.set(true)}>Start</button>
<button on:click={() => started.set(false)}>Stop</button>

<p>{$started}</p>
<p>{formattedSeconds}</p>

<h2>Todo</h2>
<ul>
	<li class="done">format seconds</li>
	<li>add total number of intervals</li>
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