<!-- script -->
<script lang="ts">
	import { workoutExercises } from '$lib/assets';
	import { chosenWorkout } from '$lib/stores';

	let selectedWorkout = $chosenWorkout.name;

	function onSelectChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const workout = target.value;
		const workoutLowerCase = workout.toLowerCase();
		const workoutIndex = workoutExercises.findIndex(
			(exercise) => exercise.name.toLowerCase() === workoutLowerCase
		);
		chosenWorkout.set(workoutExercises[workoutIndex]);
	}

</script>

<!-- html -->
<select bind:value={selectedWorkout} on:change={onSelectChange}>
	{#each workoutExercises as { name }}
		<option value={name}>{name}</option>
	{/each}
</select>

<style>
	select {
		border: none;
		border-radius: var(--radius);
		padding: 0.5rem;
		margin-top: 0.5rem;
		font-size: 1.5rem;
		background-color: var(--surface-1);
		color: var(--text-1);
		box-shadow: 0 0 1px var(--accent);
		border: solid 1px transparent;
		text-align: center;
		transition: all 0.2s ease-in-out;
	}

	select:hover,
	select:focus {
		background-color: var(--surface-1);
		color: var(--text-2);
		border: solid 1px var(--accent);
	}
</style>
