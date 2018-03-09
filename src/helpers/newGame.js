import {actionToggleActive, actionSetGridSize, actionSetGridData, actionChangeCompletedTileCount} from "./../redux/actions/game";
import {actionSetGame} from "./../redux/actions/global";
import {animals} from "./../data/animals";
import {colours} from "./../data/colours";
import {numbers} from "./../data/numbers";
import playAudio from "./playAudio";
import {shapes} from "./../data/shapes";
import {store} from "./../entry.js";

const sampleSize = require("lodash/sampleSize"); // https://lodash.com/docs/4.17.4#sampleSize
const shuffle = require("lodash/shuffle"); // https://lodash.com/docs/4.17.4#shuffle
const random = require("lodash/random"); // https://lodash.com/docs/4.17.4#random

// Set up a new game
export default function newGame(game = null, size = 12, firstLevel = true) {
	// Update state
	store.dispatch(actionSetGame(game));
	store.dispatch(actionSetGridSize(size));
	store.dispatch(actionChangeCompletedTileCount(0));

	// Get state data
	const {gridSize} = store.getState().game,
		{selectedGame, sound} = store.getState().global;

	// Load correct game grid data
	let items;

	// Load correct data for the given game
	switch (selectedGame) {
		case "animals":
			items = animals;
			break;
		case "colours":
			items = colours;
			break;
		case "numbers":
			items = numbers;
			break;
		case "shapes":
			items = shapes;
			break;
	}

	// Get random data to form grid
	items = sampleSize(items.data, gridSize / 2);

	// Duplicate so we have a pair of each
	let pairs = [...items, ...items];

	// Randomise again
	pairs = shuffle(pairs);

	let gridData = [],
		number = 0;

	// Build full grid data
	for (const pair of pairs) {
		gridData.push({
			data: pair,
			flipped: true,
			pulse: false,
			colour: `#${(Math.random() * 0x666666 + 0x666666).toString(16).substring(0, 6)}`, // Randomly generated tile colour
			angle: number % 2 === 0 ? `transform: rotate(${random(-1.5, 0, true)}deg);` : `transform: rotate(${random(0, 1.5, true)}deg);` // Randomise angle tile item is displayed at
		});
		number++;
	}

	// Add to state
	store.dispatch(actionSetGridData(gridData));

	// Play pop sound effect
	if (sound === "enabled") {
		// Set timing
		setTimeout(() => {
			playAudio("pop");
		}, firstLevel ? 0 : 1000);
	}

	// Scroll to top of page (for mobile users)
	window.scrollTo(0, 0);

	// Have a short delay where you can see all the tiles flipped before playing
	// (This is designed for pre-schoolers, so we don't want to make it too hard!)
	// Hide tiles after a delay (depending on how many tiles are in the grid)
	setTimeout(() => {
		const initialGridData = store.getState().game.gridData;

		const gridData = initialGridData.map((value) => {
			value.flipped = false;
			return value;
		});

		// Fire only if user hasn't immediately returned to the home screen
		if (store.getState().global.selectedGame !== null) {
			// Play swoosh sound effect
			playAudio("swooshes");

			// Update state to start game
			store.dispatch(actionToggleActive());
			store.dispatch(actionSetGridData(gridData));
		}
	}, 250 * store.getState().game.gridSize);
}
