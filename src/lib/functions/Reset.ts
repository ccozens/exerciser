import { currentPeriod, isRest, started } from '$lib/stores';
import { tweened } from 'svelte/motion';

export function reset(work: number) {
	currentPeriod.set(0);
	isRest.set(false);
	started.set(false);
	time.set(work * 1000);
}

const time = tweened(0);
