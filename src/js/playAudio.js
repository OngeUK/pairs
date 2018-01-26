// Play audio file sound effect
export default function playAudio(id) {
	const toPlay = document.getElementById(id),
		audio = document.querySelectorAll("audio");

	// Mute any queued sounds - DOESN'T WORK
	for (const sound of audio) {
		sound.volume = 0;
	}

	toPlay.volume = 1;
	toPlay.currentTime = 0; // Reset position in case audio file is already playing
	toPlay.play();
}
