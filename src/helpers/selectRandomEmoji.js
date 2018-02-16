const shuffle = require("lodash/shuffle"); // https://lodash.com/docs/4.17.4#shuffle

// Select emoji at random (originally used the unicode characters, but Chrome breaks them at large font sizes so using svgs instead)
export default function selectRandomEmoji() {
	let emojis = [
		"face-savouring-delicious-food",
		"grinning-face-with-smiling-eyes",
		"smiling-face-with-open-mouth",
		"smiling-face-with-open-mouth-and-smiling-eyes"
	];

	emojis = shuffle(emojis);
	return emojis[0];
}
