<!-- script -->
<script lang='ts'>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let voicesPromise: Promise<SpeechSynthesisVoice[]> ;
    if (browser) {
        voicesPromise= new Promise((resolve) => {
            speechSynthesis.onvoiceschanged = () => {
                voices = speechSynthesis.getVoices();
                resolve(voices);
            };
        });
    }
    let voices: SpeechSynthesisVoice[] = [];

    let voice: SpeechSynthesisVoice ;

    let isReady = false;
    $: isReady = typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== null;


   onMount(async () => {
        voices = await voicesPromise;
        voice = voices[50];
    });


	export let text = 'Hello world';

    // run speak when text updates
    $: isReady ? speak() : null;

	function speak() {
        speechSynthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.voice = voice;
		speechSynthesis.speak(utterance);
	}
</script>

<!-- html
<ul>
    <li>
        <a href='https://dev.to/taw/getting-started-with-web-speech-synthesis-api-and-svelte-3l13'>dev article</a>
    </li>
    <li>
        <a href='https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis'>MDN</a>
    </li>
</ul> -->
