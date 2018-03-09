// Initial preloading state
const initialLoadingState = {
	loading: true,
	percentage: 0,
	error: false
};

export const preload = (state = initialLoadingState, action) => {
	switch (action.type) {
		case "PRELOAD-PROGRESS":
			return Object.assign({}, state, {
				percentage: action.value
			});
		case "PRELOAD-COMPLETE":
			return Object.assign({}, state, {
				loading: false
			});
		case "PRELOAD-FAILED":
			return Object.assign({}, state, {
				error: action.value
			});
		default:
			return state;
	}
};
