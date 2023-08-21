<!-- script -->
<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { currentPeriod, isRest, started, preTimerRunning } from '$lib/stores';
	import { formatTime, calculateTotalWorkoutTime, getWorkout } from '$lib/functions';
	import ProgressBar from '$lib/components/ProgressBar.svelte';

	function reset(work: number) {
		$currentPeriod = 0;
		$isRest = false;
		$started = false;
		$time = work * 1000;
	}
	// props
	export let rest = 2; // TYPE NUMBER OF SECONDS HERE
	export let work = 5; // TYPE NUMBER OF SECONDS HERE
	export let chosenWorkout: string = 'isometric';
	export let chosenWorkoutArray: string[] = [];
	export let numberOfPeriods: number = 5;
	// create time with initial value of work seconds
	let time = tweened(work*1000, { duration: 0 }); // duration 0 means the timer sets instantly, and this is a default value meaning it is maintained when the $time is set later

	$: console.log($time, $currentPeriod);
	// main intervalTimer function
	const intervalTimer = (workout: string[]) => {
		if (!started) return;
		// set number of periods based on workout array length
		if (workout) {
			numberOfPeriods = workout.length;
		}

		// if time is greater than 0
		if ($time > 0) {
			// decrement time by 1000 ms
			$time = $time - 1000;
			// run intervalTimer again in 1 second
			setTimeout(intervalTimer, 1000);
		} else {
			// if currentPeriod is less than numberOfPeriods
			if ($currentPeriod < numberOfPeriods) {
				// iterate currentPeriod if isRest is false
				!$isRest ? currentPeriod.set($currentPeriod + 1) : null;
				// call reset if currentPeriod has reached numberOfPeriods
                if ($currentPeriod === numberOfPeriods) {
					$started = false;
				}
				// toggle isRest
				$isRest = !$isRest;
				// set time to work or rest interval
				$time = $isRest ? rest * 1000 : work * 1000;
				// run intervalTimer again in 1 millisecond
				setTimeout(intervalTimer, 1000);
			}
		}
	};

	$: chosenWorkoutArray = getWorkout(chosenWorkout);

	// when started is true, run 5 second leadin timer and then call intervalTimer to start timer
	$: if ($started) {
		intervalTimer(chosenWorkoutArray);
	}

	$: formattedTime = formatTime($time);
	const totalWorkoutTime = calculateTotalWorkoutTime(rest, work, numberOfPeriods);
</script>

<!-- html -->

{#if !$started}
	<p>
		Workout length:
		<span class="mins">{totalWorkoutTime}</span>
	</p>
{/if}
{#if $started && $preTimerRunning}
	<p>Starting in <span class="mins">{formattedTime}</span></p>
{/if}
{#if $started && !$preTimerRunning}
	<span class="mins">{formattedTime}</span>
	<p class="exercise">{$isRest ? 'Rest' : chosenWorkoutArray[$currentPeriod]}</p>
	<p>Period: {$currentPeriod} / {numberOfPeriods}</p>
{/if}
<!-- <ProgressBar time={$time} {interval} /> -->

<button on:click={() => reset(work)}>Stop</button>
