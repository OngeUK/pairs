import {store} from "./../entry.js";

// Pulsate matching tiles
export function tilePulse(tileId, type = "add") {
	const {gridData} = store.getState().game,
		value = type === "add";

	gridData[parseInt(tileId)].pulse = value;
}
