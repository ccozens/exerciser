import { currentPeriod, isRest, started, time } from '$lib/stores';

export function reset() {
	started.set(false);
	currentPeriod.set(0);
	isRest.set(false);
	time.set(0);
}
