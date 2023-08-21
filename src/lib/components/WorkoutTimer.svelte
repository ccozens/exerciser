<script lang="ts">
	import { started } from '$lib/stores';
	import { tweened } from 'svelte/motion';
    import type { Tweened } from 'svelte/motion';
	import { formatTime } from '$lib/functions';

    // constructor to create timer that counts down from interval to zero when created, using set interval to subtract 1 every second without using tweened

	class Timer2 {
		interval: number;
		timer: Tweened<number>;
		constructor(interval: number) {
			this.interval = interval;
			this.timer = tweened(interval, {
				duration: interval * 1000,
				easing: (t) => t
			});
		}

		start() {
			this.timer.set(0);
		}
	}

	// create a timer with a 1 second interval
	let interval = 5;
	let seconds: Tweened<number> | number; // number allowed to can set to 0 when countdown undefined
	let countdown: Timer2;

	// when timer is started, run the timer
	$: if ($started) {
        countdown = new Timer2(interval);
        countdown.start();
    }

    $: if (countdown) {
        countdown.timer.subscribe((value) => {
        seconds =  value;
    })
    } else {
        seconds = 0;
    }

	$: formattedSeconds = formatTime(seconds);

    function createCountdown(interval: number) {
		return new Timer2(interval);
	}

	function handleNewtCountdownClick() {
		countdown = createCountdown(interval);
	}

	$: console.log('seconds', seconds);
	$: console.log('started', $started);
	$: console.log('countdown', countdown);
</script>

<button on:click={handleNewtCountdownClick}>New countdown</button>
<button on:click={() => started.set(true)}>Start</button>
<button on:click={() => started.set(false)}>Stop</button>

<p>{seconds}</p>
<p>{$started}</p>
<p>{formattedSeconds}</p>


<h2>Todo</h2>
<ul>
    <li>format seconds</li>
    <li>progress bar</li>
    <li>rest / work types to control direction of progress</li>
    <li>add total number of intervals</li>
    <li>tally intervals</li>
    <li>fire off timers when intervals start</li>
</ul>