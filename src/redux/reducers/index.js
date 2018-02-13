import {combineReducers} from "redux";
import {global} from "./global";
import {levelComplete} from "./levelComplete";
import {preload} from "./preload";

// Combine all our reducers
export const reducers = combineReducers({
	preload,
	global,
	levelComplete
});
