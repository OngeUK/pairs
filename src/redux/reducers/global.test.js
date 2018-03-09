/* eslint-disable no-undef */
import * as global from "./../actions/global";
import {createStore} from "redux";
import {reducers} from ".";

// Create our store
const store = createStore(reducers);

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
