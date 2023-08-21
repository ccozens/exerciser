import { tweened } from 'svelte/motion';
import type { Tweened } from 'svelte/motion';
import { started } from '$lib/stores/started';

// constructor to create timer that counts down from interval to zero when created, using set interval to subtract 1 every second without using tweened
export class Timer {
	interval: number;
	timer: Tweened<number>;
	constructor(interval: number) {
		this.interval = interval;
		this.timer = tweened(interval, {
			duration: interval * 1000
		});
	}

	start() {
		this.timer.set(0);
		started.set(true);
	}

}
