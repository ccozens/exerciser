/* import { derived } from 'svelte/store';
import { started } from './started';

// increment the current period by 1 when $started is true
export let period = 0;

export const currentPeriod = derived(started, $started => {
    console.log('currentPeriod', $started, period);
    if ($started === true) {
        period += 1;
    }
    console.log('at end', period);
    return period;
}
); */

import { writable } from 'svelte/store';

export const currentPeriod = writable(0);
