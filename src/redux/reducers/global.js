// Initial global state
const initialGlobalState = {
	sound: localStorage.getItem("sound") || "enabled",
	selectedGame: null,
	emoji: "grinning-face-with-smiling-eyes"
};

export const global = (state = initialGlobalState, action) => {
	const soundSetting = state.sound === "enabled" ? "disabled" : "enabled";

	switch (action.type) {
		case "TOGGLE-SOUND":
			localStorage.setItem("sound", soundSetting);
			return Object.assign({}, state, {
				sound: soundSetting
			});
		case "SET-GAME":
			return Object.assign({}, state, {
				selectedGame: action.value
			});
		case "BACK-TO-HOME":
			return Object.assign({}, state, {
				selectedGame: null
			});
		case "SET-EMOJI":
			return Object.assign({}, state, {
				emoji: action.value
			});
		default:
			return state;
	}
};
