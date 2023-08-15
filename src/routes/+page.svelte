<script lang="ts">
	import Card from '$lib/components/Card.svelte';
    import Timer from '$lib/components/Timer.svelte';
    import { currentPeriod, isRest, started } from '$lib/stores';
    import Start from '$lib/components/Start.svelte';


    function setStarted() {
        started.set(true);
    }

    function working() {

}
</script>


<Start on:startSession={setStarted}/>
<!-- here for dev, not sure I want -->
<button on:click={() => started.set(false)}>Stop</button>

<Card Title="Work" Exercise="Pushups" interval={5} />
{$isRest ? 'Resting' : 'Working'}
