<script lang="ts">
	import { started } from '$lib/stores';
	// import { reset } from '$lib/functions/';
	import { workouts } from '$lib/assets';
	import Workout from '$lib/components/Workout.svelte';

	let rest = 2; // TYPE NUMBER OF SECONDS HERE
	let work = 3; // TYPE NUMBER OF SECONDS HERE


	let chosenWorkout: string = 'isometric';
	let chosenWorkoutArray: string[] = [];
</script>

<main>

	<h1> Set rest to true on start and add "intro" fn or similar to each workout so there is a leadin ?? </h1>
	<!-- form to allow work and rest interval updating -->
	<form>
		<label for="work">Work Interval</label>
		<input type="number" name="work" id="work" bind:value={work} />
		<label for="rest">Rest Interval</label>
		<input type="number" name="rest" id="rest" bind:value={rest} />
	</form>

	<!-- chosenWorkoutArray bound so Workout can update this page -->
	<Workout bind:chosenWorkoutArray {work} {rest} {chosenWorkout} />

	<button on:click={() => started.set(true)}>Start</button>

	<!-- exercises in workout -->
	<div>
		<h3>Chosen workout: <span class="capitalise">{chosenWorkout}</span></h3>
		{#each chosenWorkoutArray as exercise}
			<p>{exercise}</p>
		{/each}
	</div>

	<!-- workouts to choose -->
	<div>
		{#each Object.keys(workouts) as workout}
			<button on:click={() => (chosenWorkout = workout)}
				><span class="capitalise">{workout}</span></button
			>
		{/each}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		width: 600px;
		margin: 0 auto;
	}

	.capitalise {
		text-transform: capitalize;
	}
</style>
