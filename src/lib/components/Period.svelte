<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import ProgressBar from './ProgressBar.svelte';
	import { Speech } from '$lib/components';

	export let label: string = 'exercise';
	export let tween: Tweened<number> = tweened(0, { duration: 0 });
	export let tweenedDuration: number = 0;
	export let nextLabel: string = 'exercise';
	export let direction:string = 'height';

	$: tweenedProgress = $tween / tweenedDuration;

	let setNextLabel = '';
	// setNextLabel is true when tween is 3000ms from completion
	$: setNextLabel = $tween - 3000 >= 0 ? nextLabel : '';
</script>

<p>{label}</p>
<ProgressBar {tweenedProgress} {direction}/>

{#if setNextLabel}
	<Speech text={nextLabel} />
{/if}
