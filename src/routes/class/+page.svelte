<script lang="ts">
	import WorkoutTimer from '$lib/components/WorkoutTimer.svelte';
	import { workouts } from '$lib/assets';
	import { Timer } from '$lib/classes/Timer';
	import { started, currentPeriod, isRest } from '$lib/stores';

	let workout = workouts.isometric;
	let countdown: Timer;
	// pre-timer, then alternate work / rest, ending on work
	const numberOfPeriods = workout.length * 2;
	const preTime: number = 5;
	const workTimer: number = 3;
	const restTimer: number = 5;

	// $currentPeriod increments by 1 when a new timer is created (actually when $started is true), so during workout: currentPeriod === 1 is preTimer, current period is even is work period, and current period odd is a rest period, up to the number of periods
	async function startWorkout() {
		for (let i = 0; i < numberOfPeriods; i++) {
            console.log(i);
			// if ($currentPeriod < numberOfPeriods) {
				// currentPeriod 0 is pre timer to get ready
				if (i === 0) {
					countdown = new Timer(preTime);
					countdown.start();
                    
				} // current period is even, work period
				else if (i % 2 === 0) {
					countdown = new Timer(workTimer);
					countdown.start();
				} else {
					// current period is odd, rest period
					countdown = new Timer(restTimer);
					countdown.start();
				// }
			}
		}
	}

	function reset() {
		$currentPeriod = 0;
		$started = false;
	}

	console.log(numberOfPeriods);
	console.log($currentPeriod);
	console.log($currentPeriod % 2 === 0);
</script>

<main>
	<p>Hi</p>
	<WorkoutTimer bind:countdown />
	{$started}
    <p>currentPeriod {$currentPeriod}</p>
	<button on:click={startWorkout}>Start</button>
	<button on:click={reset}>Stop</button>

</main>
