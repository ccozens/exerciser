import type { Workout } from '$lib/types';
import { tweened } from 'svelte/motion';
export const finish: Workout = {
	label: 'Finish',
	tween: tweened(0, { duration: 0 }),
	tweenedDuration: 0
};
