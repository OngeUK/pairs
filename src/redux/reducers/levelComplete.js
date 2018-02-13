export const levelComplete = (state = {}, action) => {
	switch (action.type) {
		case "TOGGLE-LEVEL-COMPLETE-ANIMATION":
			return Object.assign({}, state, {
				reveal: action.value
			});
		default:
			return state;
	}
};
