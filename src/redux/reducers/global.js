// Initial global state
const initialGlobalState = {
	sound: true,
	selectedGame: null,
	emoji: null
};

export const global = (state = initialGlobalState, action) => {
	const soundEnabled = !state.sound;

	switch (action.type) {
		case "TOGGLE-SOUND":
			return Object.assign({}, state, {
				sound: soundEnabled
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
