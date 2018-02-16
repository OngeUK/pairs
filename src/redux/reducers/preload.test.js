/* eslint-disable no-undef */
import * as preload from "./../actions/preload";
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
