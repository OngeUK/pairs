// Format image url from game data
export default function formatImageUrl(value) {
	return value.replace(" ", "-").toLowerCase();
}
