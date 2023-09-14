import { writable, derived } from 'svelte/store';
import { workoutExercises } from '$lib/assets';
import { preWorkoutDuration, restDuration, workDuration } from '$lib/stores/elementDurations'; // if `elementDurations` omitted from import string SSR fails??
import { createFinalWorkoutArray } from '$lib/functions';

export const chosenWorkout = writable(workoutExercises['isometric']);

export const workoutInfo = derived(
	[chosenWorkout, preWorkoutDuration, restDuration, workDuration],
	([$chosenWorkout, $preWorkoutDuration, $restDuration, $workDuration]) => {
		// create final workout array
		const finalWorkoutArray = createFinalWorkoutArray(
			$chosenWorkout,
			$restDuration,
			$workDuration,
			$preWorkoutDuration
		);
		// calculate total duration of workout (in ms)
		const totalDuration = finalWorkoutArray.reduce((acc, curr) => acc + curr.tweenedDuration, 0);
		return { finalWorkoutArray, totalDuration };
	}
);
