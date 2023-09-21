export function speak(nextLabel: string, voice: SpeechSynthesisVoice) {
	speechSynthesis.cancel();
	const utterance = new SpeechSynthesisUtterance(nextLabel);
	utterance.voice = voice;
	speechSynthesis.speak(utterance);
}
