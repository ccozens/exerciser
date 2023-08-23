import { createWorkoutArray, appendPreTimer } from '$lib/functions';

export function createFinalWorkoutArray(
	chosenWorkout: string[],
	workDuration: number,
	restDuration: number,
	preWorkoutDuration: number
) {
	// construct flat array of objects with label and tween, interpolating exercise and rest periods

	const initialWorkoutArray = createWorkoutArray(chosenWorkout, workDuration, restDuration);

	// append preWorkoutDuration to workoutArray
	const finalWorkoutArray = appendPreTimer(initialWorkoutArray, preWorkoutDuration);

	// calculate total duration of workout (in ms)
	const totalDuration = finalWorkoutArray.reduce((acc, curr) => acc + curr.tweenedDuration, 0);

	return { finalWorkoutArray, totalDuration };
}
