import type { Tweened } from 'svelte/motion';

export interface Workout {
	label: string;
	tween: Tweened<number>;
	tweenedDuration: number;
}

export interface WorkoutExercises {
	name: string;
	exercises: string[];
}
