import { started } from '$lib/stores';
// start workout
export function setStarted() {
	started.set(true);
}
