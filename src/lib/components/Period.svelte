<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import ProgressBar from './ProgressBar.svelte';
	import { started } from '$lib/stores';
	import { speak, loadVoices } from '$lib/functions';

	// label, tween, tweenedDuration are passed in as the period object
	export let label: string = 'exercise';
	export let tween: Tweened<number> = tweened(0, { duration: 0 });
	export let tweenedDuration: number = 0;
	export let nextLabel: string = 'exercise';
	export let direction: string = 'height';

	$: tweenedProgress = $tween / tweenedDuration;

	let setNextLabel = '';
	// setNextLabel is nextLabel when tween is 3000ms from completion
	$: setNextLabel = tweenedDuration - $tween <= 3000 ? nextLabel : '';

	// load voices
	// create voice and voices vars
	let voice: SpeechSynthesisVoice;
	let voices: SpeechSynthesisVoice[] = [];

	$: if ($started) {
		loadVoices({ voices: voices }).then((voices) => {
			voice = voices[50];
		});
	}

	$: if (setNextLabel && voice) {
		speak(setNextLabel, voice);
	}
</script>

{#if label === 'preTimer'}
	<p>Get ready...</p>
{:else if label === 'rest'}
	<p>Next: {nextLabel}</p>
{:else}
	<p>{label}</p>
{/if}
<ProgressBar {tweenedProgress} {direction} {tween}/>

<style>
	p {
		text-align: center;
	}
</style>
