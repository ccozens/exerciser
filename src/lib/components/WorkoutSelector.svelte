<!-- script -->
<script lang="ts">
	import { workoutExercises } from '$lib/assets';
	import { Button } from '$lib/components/';
	import { chosenWorkout } from '$lib/stores';

	export let workoutDisplay: string = 'isometric';

	function setWorkout(workout: string) {
		workoutDisplay = workout;
	}

	function getWorkoutOnClick(workout: string) {
		const workoutLowerCase = workout.toLowerCase();
		chosenWorkout.set(workoutExercises[workoutLowerCase]);
	}
</script>

<!-- html -->
<div class="buttons">
	{#each Object.keys(workoutExercises) as workout}
		<Button
			text={workout}
			on:click={() => {
				setWorkout(workout);
				getWorkoutOnClick(workout);
			}}
		/>
	{/each}
</div>

<style>
	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		align-items: center;
	}
</style>
