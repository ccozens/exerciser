import { tweened } from 'svelte/motion';
import type { Workout } from './types';

export function appendPreTimer(workoutArray: Workout[], preWorkoutDuration: number): Workout[] {
	const tweenedDuration = preWorkoutDuration * 1000;
	// define preTimer that runs before workout starts
	const preWorkout = {
		label: 'preTimer',
		tweenedDuration: tweenedDuration,
		tween: tweened(0, { duration: tweenedDuration })
	};

	workoutArray.unshift(preWorkout);

	// append preTimer to front of workoutArray array
	return workoutArray;
}
