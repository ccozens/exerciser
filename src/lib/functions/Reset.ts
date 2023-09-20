import type { Workout } from '$lib/types';
import type { Tweened } from 'svelte/motion';
import type { Writable } from 'svelte/store';
import { resetPeriod } from './ResetPeriod';

export async function reset(
	started: Writable<boolean>,
	isModalOpen: boolean,
	totalDurationTween: Tweened<number>,
	currentIndex: number,
	currentPeriod: Workout,
	nextPeriod: Workout,
	finalWorkoutArray: Workout[]
) {
	// set started to false
	started.set(false);
	// close modal
	isModalOpen = false;
	await resetPeriod(currentIndex, finalWorkoutArray);
	// reset totalDurationTween
	totalDurationTween.set(0, { duration: 0 });
	// reset currentIndex
	currentIndex = 0;
	// reset currentPeriod
	currentPeriod = finalWorkoutArray[currentIndex];
	// reset nextPeriod
	nextPeriod = finalWorkoutArray[currentIndex + 1];
	return { isModalOpen, totalDurationTween, currentIndex, currentPeriod, nextPeriod };
}
