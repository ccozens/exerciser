<!-- script -->
<script lang='ts'>

    export let text = '' ;

	function speak(text: string) {
        speechSynthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(text);
		// utterance.voice = voice;
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
