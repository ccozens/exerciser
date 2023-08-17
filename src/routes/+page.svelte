<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { currentPeriod, isRest, started } from '$lib/stores';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { reset, formatTime, calculateTotalWorkoutTime, getWorkout } from '$lib/functions/';
	import { workouts } from '$lib/assets';

	let rest = 2; // TYPE NUMBER OF SECONDS HERE
	let work = 1; // TYPE NUMBER OF SECONDS HERE
	// create time with initial value of 5 seconds
	let time = tweened(5000, { duration: 0 }); // duration 0 means the timer sets instantly, and this is a default value meaning it is maintained when the $time is set later

	let numberOfPeriods: number = 2;

	let chosenWorkout: string = 'isometric';

	$: chosenWorkoutArray = getWorkout(chosenWorkout);

	$: isStarted = $started;

	const intervalTimer = (workout: string[]) => {
		if (!isStarted) return;
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
	// call intervalTimer to start timer if isStarted is true
	$: if (isStarted) {
		intervalTimer(chosenWorkoutArray);
	}

	$: formattedTime = formatTime($time);

	$: interval = $isRest ? rest * 1000 : work * 1000;

	const totalWorkoutTime = calculateTotalWorkoutTime(rest, work, numberOfPeriods);
</script>

<main>
	<form>
		<label for="work">Work Interval</label>
		<input type="number" name="work" id="work" bind:value={work} />
		<label for="rest">Rest Interval</label>
		<input type="number" name="rest" id="rest" bind:value={rest} />
	</form>

	{#if !$started}
		<p>Workout: {chosenWorkout}</p>
		<p>
			Workout length:
			<span class="mins">{totalWorkoutTime}</span>
		</p>
	{:else}
		<span class="mins">{formattedTime}</span>
		<p>{$isRest ? 'Rest' : chosenWorkoutArray[$currentPeriod]}</p>
	{/if}
	<p>period: {$currentPeriod}</p>
	<p>isRest: {$isRest}</p>
	<p>numberOfPeriods: {numberOfPeriods}</p>

	<button on:click={() => started.set(true)}>Start</button>
	<button on:click={() => reset(work)}>Stop</button>

	{#each chosenWorkoutArray as exercise}
		<p>{exercise}</p>
	{/each}

	<!-- options -->

	{#each Object.keys(workouts) as workout}
		<button on:click={() => (chosenWorkout = workout)}>{workout}</button>
	{/each}

	<ProgressBar time={$time} {interval} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		width: 600px;
		margin: 0 auto;
	}
</style>
