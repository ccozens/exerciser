<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import type { Tweened } from 'svelte/motion';
	import ProgressBar from './ProgressBar.svelte';

	// label, tween, tweenedDuration are passed in as the period object
	export let label: string = 'exercise';
	export let tween: Tweened<number> = tweened(0, { duration: 0 });
	export let tweenedDuration: number = 0;
	export let nextLabel: string = 'exercise';
	export let direction: string = 'height';

	$: tweenedProgress = $tween / tweenedDuration;

	let setNextLabel = '';
	// setNextLabel is nextLabel when tween is 3000ms from completion
	$: setNextLabel = $tween - 3000 >= 0 ? nextLabel : '';

	// load voices
	// create voice and voices vars
	let voice: SpeechSynthesisVoice;
	let voices: SpeechSynthesisVoice[] = [];
	// get the list of voices
	async function loadVoices() {
		// fetch the available voices.
		voices = speechSynthesis.getVoices();
		return voices;
	}
	onMount(async () => {
		await loadVoices();
		voice = voices[50];
	});

	function speak(nextLabel: string) {
		speechSynthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(nextLabel);
		utterance.voice = voice;
		speechSynthesis.speak(utterance);
	}

	$: if (setNextLabel && voice) {
		speak(setNextLabel);
	}
</script>

<p>{label}</p>
<ProgressBar {tweenedProgress} {direction} />
