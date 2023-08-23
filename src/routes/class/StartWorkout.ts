import type { Workout } from './types';
import { started } from '$lib/stores';
import type { Tweened } from 'svelte/motion';

// start workout
export async function startWorkout(finalWorkoutArray: Workout[]) {
	// set started to true
	started.set(true);

	// set started to false
	started.set(false);
}
