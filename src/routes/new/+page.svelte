<!-- script -->
<script lang="ts">
	import { currentPeriod, isRest, started, time } from '$lib/stores';
	import Start from '$lib/components/Start.svelte';
	import Stop from '$lib/components/Stop.svelte';

    let interval ;
	// async function to start a timer
	function testTimer() {
		// abort if not started
        if (!isStarted) return;


		interval = setInterval(() => {
			console.log('started');
			currentPeriod.set($currentPeriod + 1); // increment current period
			isRest.set(false);
            console.log('period: ', $currentPeriod);
			if ($currentPeriod === 5) {
				console.log('finished');
				started.set(false);
                clearInterval(interval); // stops loop
			}
		}, 1000);
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
