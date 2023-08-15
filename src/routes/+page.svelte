<script lang="ts">
	import Card from '$lib/components/Card.svelte';
    import Timer from '$lib/components/Timer.svelte';
    import { currentPeriod, isRest } from '$lib/stores';
    import Start from '$lib/components/Start.svelte';
    import { started } from '$lib/stores';
    // $: console.log('currentPeriod', currentPeriod);
    // $: console.log('isRest', isRest);

    let interval = 0;
    let exerciseInterval:number = 60;
    let breakInterval = 15;

    $currentPeriod = 1;
    $isRest = false;

    function setStarted() {
        started.set(true);
    }
</script>


<Start on:startSession={setStarted}/>
<!-- here for dev, not sure I want -->
<button on:click={() => started.set(false)}>Stop</button>

<Card Title="Work" Exercise="Pushups" interval={exerciseInterval}  />
{$isRest ? 'Resting' : 'Working'}
