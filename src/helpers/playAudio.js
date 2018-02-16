import {store} from "./../entry.js";

// Play audio file sound effect
export default function playAudio(id) {
	const {sound} = store.getState().global;

	if (sound === "enabled") {
		const toPlay = document.getElementById(id);

		toPlay.volume = 0.5;
		toPlay.currentTime = 0; // Reset position in case audio file is already playing
		toPlay.play();
	}
}
