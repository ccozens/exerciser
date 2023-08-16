import { currentPeriod, isRest, started, time } from '$lib/stores';

export function reset() {
	currentPeriod.set(0);
	isRest.set(false);
	time.set(0);
	started.set(false);
}
