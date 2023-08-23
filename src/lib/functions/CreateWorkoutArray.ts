import { tweened } from 'svelte/motion';
import type { Workout } from '$lib/types';

export function createWorkoutArray(
	workout: string[],
	workDuration: number,
	restDuration: number
): Workout[] {
	const workoutArray = workout.flatMap((exercise, index) => {
		let tweenedDuration = workDuration * 1000;
		const period = {
			label: exercise,
			tweenedDuration: tweenedDuration,
			tween: tweened(0, { duration: tweenedDuration })
		};
		if (index === 0) {
			return [period];
		} else {
			tweenedDuration = restDuration * 1000;
			return [
				{
					label: 'rest',
					tweenedDuration: tweenedDuration,
					tween: tweened(0, { duration: tweenedDuration })
				},
				period
			];
		}
	});

	return workoutArray;
}
