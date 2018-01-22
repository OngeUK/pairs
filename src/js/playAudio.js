// Play audio file sound effect
export default function playAudio(id) {
	const audio = document.getElementById(id);

	audio.currentTime = 0; // Reset position in case audio file is already playing
	audio.play();
}
