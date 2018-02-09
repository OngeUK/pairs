/* eslint-disable no-undef */
import * as global from "./../actions/global";
import * as preload from "./../actions/preload";
import {actionLevelComplete} from "./../actions/level-complete";
import {createStore} from "redux";
import {reducers} from ".";

// Create our store
const store = createStore(reducers);

// Test preload actions
test("Pre-loader progress", () => {
	store.dispatch(preload.actionPreloadProgress(10));
	expect(store.getState().preload.percentage).toBe(10);
});

test("Pre-loader complete", () => {
	store.dispatch(preload.actionPreloadComplete(false));
	expect(store.getState().preload.loading).toBe(false);
});

test("Pre-loader failed", () => {
	store.dispatch(preload.actionPreloadFailed());
	expect(store.getState().preload.error).toBe(true);
});

// Test global actions
test("Set game", () => {
	store.dispatch(global.actionSetGame("animals"));
	expect(store.getState().global.selectedGame).toBe("animals");
});

test("Back to home", () => {
	store.dispatch(global.actionBackToHome());
	expect(store.getState().global.selectedGame).toBe(null);
});

test("Set emoji", () => {
	store.dispatch(global.actionSetEmoji("smiling-face-with-open-mouth"));
	expect(store.getState().global.emoji).toBe("smiling-face-with-open-mouth");
});

test("Toggle sound", () => {
	const soundEnabled = store.getState().global.sound;

	store.dispatch(global.actionToggleSound());
	expect(store.getState().global.sound).not.toBe(soundEnabled);
});

// Test Level complete actions
test("Level complete status", () => {
	store.dispatch(actionLevelComplete(true));
	expect(store.getState().levelComplete.reveal).toBe(true);
});
