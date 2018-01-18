const shuffle = require("lodash/shuffle"); // https://lodash.com/docs/4.17.4#shuffle

// Select emoji at random
export default function selectRandomEmoji() {
	let emojis = ["😃", "😁", "😄", "😊", "🙂", "😋"];

	emojis = shuffle(emojis);
	return emojis[0];
}
