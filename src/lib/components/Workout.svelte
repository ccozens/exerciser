<!-- script -->
<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { currentPeriod, isRest, started } from '$lib/stores';
	import { formatTime, calculateTotalWorkoutTime, getWorkout } from '$lib/functions';
	import ProgressBar from '$lib/components/ProgressBar.svelte';

	export let rest = 2; // TYPE NUMBER OF SECONDS HERE
	export let work = 1; // TYPE NUMBER OF SECONDS HERE
	export let chosenWorkout: string = 'isometric';
	export let chosenWorkoutArray: string[] = [];
	export let numberOfPeriods: number = 2;
	// create time with initial value of 5 seconds
	let time = tweened(5000, { duration: 0 }); // duration 0 means the timer sets instantly, and this is a default value meaning it is maintained when the $time is set later

	const intervalTimer = (workout: string[]) => {
		if (!started) return;
		if (workout) {
			numberOfPeriods = workout.length;
		} // if time is greater than 0
		if ($time > 0) {
			// decrement time by 1000 ms
			$time = $time - 1000;
			// run intervalTimer again in 1 second
			setTimeout(intervalTimer, 1000);
		} else {
			// if currentPeriod is less than numberOfPeriods - 1
			if ($currentPeriod < numberOfPeriods - 1) {
				// iterate currentPeriod if isRest is false
				!$isRest ? currentPeriod.set($currentPeriod + 1) : null;
				// toggle isRest
				isRest.set(!$isRest);
				// set time to work or rest interval
				$time = $isRest ? rest * 1000 : work * 1000;
				// run intervalTimer again in 1 second
				setTimeout(intervalTimer, 1000);
			}
		}
	};

	$: chosenWorkoutArray = getWorkout(chosenWorkout);
    const startArray = ['Get Ready'];
	// call intervalTimer to start timer if started is true
	$: if ($started) {
        intervalTimer(startArray)
		intervalTimer(chosenWorkoutArray);
	}

	$: formattedTime = formatTime($time);
	const totalWorkoutTime = calculateTotalWorkoutTime(rest, work, numberOfPeriods);
	$: interval = $isRest ? rest * 1000 : work * 1000;
</script>

<!-- html -->

{#if !$started}
	<p>Workout: {chosenWorkout}</p>
	<p>
		Workout length:
		<span class="mins">{totalWorkoutTime}</span>
	</p>
{:else}
	<span class="mins">{formattedTime}</span>
	<p class="exercise">{$isRest ? 'Rest' : chosenWorkoutArray[$currentPeriod]}</p>
    <p>Period: {$currentPeriod} / {numberOfPeriods}</p>

    {/if}

<ProgressBar time={$time} {interval} />
