<!-- script -->
<script lang="ts">
	import { currentPeriod, isRest, started, time } from '$lib/stores';
	import Start from '$lib/components/Start.svelte';
	import Stop from '$lib/components/Stop.svelte';

	let interval;
	// async function to start a timer
	function testTimer() {
		// abort if not started
		if (!isStarted) return;

		while ($currentPeriod < 5) {
			// if isRest, set interval to 1s
			if (isRest) {
				interval = setTimeout(() => {
					console.log('rest');
					isRest.set(false);
					console.log('period: ', $currentPeriod);
					if ($currentPeriod === 5) {
						console.log('finished');
						started.set(false);
					}
				}, 1000);
			}
			if (!isRest) {
				// if !isRest, incrememnt currentPeriod and set interval to 3s
				interval = setTimeout(() => {
					currentPeriod.set($currentPeriod + 1); // increment current period
					isRest.set(true);
					console.log('work');
					console.log('period: ', $currentPeriod);
				}, 3000);
			}
		}
	}

	// function to update started store
	function setStarted() {
		started.set(true);
	}
	$: isStarted = $started;
	// run timer if started
	$: if (isStarted) {
		testTimer();
	}
</script>

<!-- html -->
<Start on:startSession={setStarted} />
emits startSession on click
<Stop />
runs reset to stop timer and reset values
