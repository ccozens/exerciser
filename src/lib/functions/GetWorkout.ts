import { workoutExercises } from '$lib/assets/';

export function getWorkout(workout: string): string[] {
	return workoutExercises[workout as keyof typeof workoutExercises];
}
