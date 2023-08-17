import { workouts } from '$lib/assets/';
export function getWorkout(workout: string): string[] {
	return workouts[workout as keyof typeof workouts];
}
