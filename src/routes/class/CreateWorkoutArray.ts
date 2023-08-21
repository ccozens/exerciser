import { tweened } from 'svelte/motion';
import type { Workout } from './types';
export function createWorkoutArray(workout: string[], workDuration: number, restDuration: number): Workout[] {
	const workoutArray = workout.flatMap((exercise, index) => {
		const period = {
			label: exercise,
			tween: tweened(0, { duration: workDuration * 1000 })
		};
		if (index === 0) {
			return [period];
		} else {
			return [
				{
					label: 'rest',
					tween: tweened(0, { duration: restDuration * 1000 })
				},
				period
			];
		}
	});
    
	return workoutArray;
}
