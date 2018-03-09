// Initial game state
const initialGameState = {
	active: false,
	completed: 0,
	currentTile: null,
	gridSize: 12,
	gridData: null,
	stageOver: false,
	showEmoji: false
};

export const game = (state = initialGameState, action) => {
	const activeEnabled = !state.active,
		emojiVisible = !state.showEmoji,
		stageOver = !state.stageOver;

	switch (action.type) {
		case "TOGGLE-ACTIVE-STATE":
			return Object.assign({}, state, {
				active: activeEnabled
			});
		case "DISABLE-ACTIVE-STATE":
			return Object.assign({}, state, {
				active: false
			});
		case "COMPLETED-TILE-COUNT":
			return Object.assign({}, state, {
				completed: action.value
			});
		case "SET-CURRENT-TILE":
			return Object.assign({}, state, {
				currentTile: action.value
			});
		case "SET-GRID-DATA":
			return Object.assign({}, state, {
				gridData: action.value
			});
		case "SET-GRID-SIZE-LEVEL":
			return Object.assign({}, state, {
				gridSize: action.value
			});
		case "TOGGLE-STAGE-OVER":
			return Object.assign({}, state, {
				stageOver: stageOver
			});
		case "TOGGLE-SHOW-EMOJI":
			return Object.assign({}, state, {
				showEmoji: emojiVisible
			});
		default:
			return state;
	}
};
