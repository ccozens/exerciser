<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { currentPeriod, isRest, started } from '$lib/stores';
	import ProgressBar from './ProgressBar.svelte';


	let rest = 2; // TYPE NUMBER OF SECONDS HERE
	let work = 1; // TYPE NUMBER OF SECONDS HERE
	// let $timer = tweened(0);
	let time = tweened(work * 1000, {duration: 0}); // duration 0 means the timer sets instantly, and this is a default value meaning it is maintained when the $time is set later

	let numberOfPeriods: number = 2;

    // workouts
    const workouts = {
        isometric: ['Wall sit', 'Plank', 'Chair squat', 'Glute bridge', 'Side plank'],
        movement: ['Push up', 'Squat', 'Lunge', 'Tricep dip', 'Burpee']
    }

    let chosenWorkout: string = 'isometric';
    function getWorkout(workout: string): string[] {
        return workouts[workout as keyof typeof workouts];
    }

    $: chosenWorkoutArray = getWorkout(chosenWorkout);

	$: isStarted = $started;

	const intervalTimer = (workout: string[]) => {
        if (!isStarted) return;
        if(workout)
{        numberOfPeriods = workout.length;
}		// if time is greater than 0
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

	$: minutes = Math.floor($time / 1000 / 60);
	$: seconds = Math.floor($time / 1000 - minutes * 60);

	$: formattedTime = seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;

    $: interval = $isRest ? rest * 1000 : work * 1000;

    function reset() {
        $currentPeriod =0;
        $isRest = false;
        $started = false;
        $time = work * 1000;
    }
</script>

<main>

    <form>
        <label for="work">Work Interval</label>
        <input type="number" name="work" id="work" bind:value={work} />
        <label for="rest">Rest Interval</label>
        <input type="number" name="rest" id="rest" bind:value={rest} />
    </form>
	{#if !$started}
		<span class="mins">0:00</span>
	{:else}
		<span class="mins">{formattedTime}</span>
	{/if}
	<p>period: {$currentPeriod}</p>
	<p>isRest: {$isRest}</p>
    <p>numberOfPeriods: {numberOfPeriods}</p>

	<button on:click={() => started.set(true)}>Start</button>
    <button on:click={reset}>Stop</button>

    {#each chosenWorkoutArray as exercise}
        <p>{exercise}</p>
    {/each}

    <!-- options -->

    {#each Object.keys(workouts) as workout}
        <button on:click={() => chosenWorkout = workout}>{workout}</button>
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
