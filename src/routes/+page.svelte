<script lang="ts">
	import { started } from '$lib/stores';
	import { reset } from '$lib/functions/';
	import { workouts } from '$lib/assets';
	import Workout from '$lib/components/Workout.svelte';

	let rest = 2; // TYPE NUMBER OF SECONDS HERE
	let work = 1; // TYPE NUMBER OF SECONDS HERE
	// create time with initial value of 5 seconds

	let chosenWorkout: string = 'isometric';
	let chosenWorkoutArray: string[] = [];
</script>

<main>
	<form>
		<label for="work">Work Interval</label>
		<input type="number" name="work" id="work" bind:value={work} />
		<label for="rest">Rest Interval</label>
		<input type="number" name="rest" id="rest" bind:value={rest} />
	</form>


	<Workout bind:chosenWorkoutArray={chosenWorkoutArray} {work} {rest} {chosenWorkout} />

	<button on:click={() => started.set(true)}>Start</button>
	<button on:click={() => reset(work)}>Stop</button>

	{#each chosenWorkoutArray as exercise}
		<p>{exercise}</p>
	{/each}

	<!-- options -->

	{#each Object.keys(workouts) as workout}
		<button on:click={() => (chosenWorkout = workout)}>{workout}</button>
	{/each}

</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		width: 600px;
		margin: 0 auto;
	}
</style>
