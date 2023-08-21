import { tweened } from 'svelte/motion';
import type { Workout } from './types';

export function appendPreTimer(
	workoutArray: Workout[],
	preWorkoutDuration: number
): Workout[] {
	// define preTimer that runs before workout starts
	const preWorkout = {
		label: 'preTimer',
		tween: tweened(0, { duration: preWorkoutDuration * 1000 })
	};

    workoutArray.unshift(preWorkout);

	// append preTimer to front of workoutArray array
	return workoutArray;
}
