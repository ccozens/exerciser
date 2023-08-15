<script lang="ts">
	import Card from '$lib/components/Card.svelte';
    import Timer from '$lib/components/Timer.svelte';
    import { currentPeriod, isRest } from '$lib/stores';
    import Start from '$lib/components/Start.svelte';

    // $: console.log('currentPeriod', currentPeriod);
    // $: console.log('isRest', isRest);

    let interval = 0;
    let exerciseInterval:number = 60;
    let breakInterval = 15;

    $currentPeriod = 1;
    $isRest = false;

</script>


<Start />
<Card Title="Work" Exercise="Pushups" interval={exerciseInterval}  />
{$isRest ? 'Resting' : 'Working'}
