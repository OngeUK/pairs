/* eslint-disable no-undef */
import * as game from "./../actions/game";
import {createStore} from "redux";
import {reducers} from ".";

// Create our store
const store = createStore(reducers);

// Test game actions
test("Toggle active state", () => {
	const activeState = store.getState().game.active;

	store.dispatch(game.actionToggleActive());
	expect(store.getState().game.active).not.toBe(activeState);
});

test("Disable active state", () => {
	store.dispatch(game.actionDisableActive());
	expect(store.getState().game.active).toBe(false);
});

test("Completed tile count", () => {
	store.dispatch(game.actionChangeCompletedTileCount(2));
	expect(store.getState().game.completed).toBe(2);
});

test("Set current tile", () => {
	store.dispatch(game.actionSetCurrentTile({data: "123"}));
	expect(store.getState().game.currentTile).toEqual({data: "123"});
});

test("Set grid data", () => {
	store.dispatch(game.actionSetGridData({data: "123"}));
	expect(store.getState().game.gridData).toEqual({data: "123"});
});

test("Set grid size", () => {
	store.dispatch(game.actionSetGridSize(16));
	expect(store.getState().game.gridSize).toBe(16);
});

test("Toggle stage over", () => {
	const stageOver = store.getState().game.stageOver;

	store.dispatch(game.actionToggleStageOver());
	expect(store.getState().game.stageOver).not.toBe(stageOver);
});

test("Toggle show emoji", () => {
	const emojiVisible = store.getState().game.showEmoji;

	store.dispatch(game.actionToggleShowEmoji());
	expect(store.getState().game.showEmoji).not.toBe(emojiVisible);
});
