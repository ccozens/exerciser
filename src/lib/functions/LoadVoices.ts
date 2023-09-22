// get the list of voices
export async function loadVoices({ voices }: { voices: SpeechSynthesisVoice[] }) {
	// fetch the available voices.
	voices = speechSynthesis.getVoices();
	return voices;
}
