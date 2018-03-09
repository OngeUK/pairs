import {combineReducers} from "redux";
import {game} from "./game";
import {global} from "./global";
import {preload} from "./preload";

// Combine all our reducers
export const reducers = combineReducers({
	preload,
	global,
	game
});
