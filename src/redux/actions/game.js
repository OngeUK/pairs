export const actionToggleActive = () => ({
	type: "TOGGLE-ACTIVE-STATE"
});

export const actionDisableActive = () => ({
	type: "DISABLE-ACTIVE-STATE"
});

export const actionSetGridSize = (size) => ({
	type: "SET-GRID-SIZE-LEVEL",
	value: size
});

export const actionSetCurrentTile = (data) => ({
	type: "SET-CURRENT-TILE",
	value: data
});

export const actionChangeCompletedTileCount = (number) => ({
	type: "COMPLETED-TILE-COUNT",
	value: number
});

export const actionToggleShowEmoji = () => ({
	type: "TOGGLE-SHOW-EMOJI"
});

export const actionToggleStageOver = () => ({
	type: "TOGGLE-STAGE-OVER"
});

export const actionSetGridData = (gridData) => ({
	type: "SET-GRID-DATA",
	value: gridData
});
