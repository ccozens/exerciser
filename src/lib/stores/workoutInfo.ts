import { writable, derived } from 'svelte/store';
import { workoutExercises } from '$lib/assets';

export const chosenWorkout = writable(workoutExercises['isometric']);

/* export const finalWorkoutArray = derived(createFinalWorkoutArray(
		chosenWorkout || defaultWorkout,
		restDuration,
		workDuration,
		preWorkoutDuration
	);
 */