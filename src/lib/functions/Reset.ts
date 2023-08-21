import { currentPeriod, isRest, started, preTimerRunning } from '$lib/stores';
import { tweened } from 'svelte/motion';

export function reset(work: number) {
	currentPeriod.set(0);
	isRest.set(false);
	started.set(false);
	time.set(work * 1000);
	preTimerRunning.set(false);
}

const time = tweened(0);
