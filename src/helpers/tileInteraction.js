import {actionSetGridData, actionSetCurrentTile, actionToggleActive, actionChangeCompletedTileCount, actionToggleStageOver} from "../redux/actions/game";
import {actionBackToHome} from "../redux/actions/global";
import newGame from "../helpers/newGame";
import playAudio from "../helpers/playAudio";
import {store} from "./../entry.js";
import {tilePulse} from "../helpers/tilePulse";

// Flip tile
export function tileInteraction(value, element) {
	const {active} = store.getState().game;

	if (active) {
		const {gridData, gridSize, currentTile, completed} = store.getState().game,
			{sound, selectedGame} = store.getState().global;

		// Show selected tile
		gridData[element.id].flipped = true;

		// Play swoosh sound effect
		if (sound) {
			playAudio("swoosh");
		}

		// Update state with new values
		store.dispatch(actionSetGridData(gridData));

		// If first tile selected
		if (currentTile === null) {
			// Set the id of the item we're trying to match
			store.dispatch(
				actionSetCurrentTile({
					tile: element,
					value: value
				})
			);
		} else if (currentTile.tile !== element) {
			// If the two selected tiles do not match
			if (element.dataset.value.toString() !== currentTile.value.toString()) {
				// Disable tile clicks until incorrect pairings have reset
				store.dispatch(actionToggleActive());

				// Flip tiles back after a short delay
				setTimeout(() => {
					// Hide tiles
					gridData[currentTile.tile.id].flipped = false;
					gridData[element.id].flipped = false;

					// Play swoosh sound effect
					if (sound) {
						playAudio("swooshes");
					}

					// Player got it wrong - reset the state for the next go
					store.dispatch(actionToggleActive());
					store.dispatch(actionSetCurrentTile(null));
					store.dispatch(actionSetGridData(gridData));
				}, 1500);
			} else {
				// Player matched a pair
				store.dispatch(actionToggleActive()); // Disable tile clicks until matching pair animation fires

				// Play tile matched sound effect
				if (sound) {
					playAudio("ding");
				}

				// setTimeouts to allow for transitions/animations to fire first
				setTimeout(() => {
					// Get IDs of the pair of tiles
					const pairs = document.querySelectorAll(`div[data-value='${element.dataset.value}']`);

					// Update pulse state
					for (const tile of pairs) {
						tilePulse(parseInt(tile.id));
					}

					// Reset the state for the next go
					store.dispatch(actionToggleActive());
					store.dispatch(actionSetCurrentTile(null));
					store.dispatch(actionChangeCompletedTileCount(completed + 2));

					// Has the player matched all the pairs?
					if (gridSize === store.getState().game.completed) {
						store.dispatch(actionToggleStageOver());
						store.dispatch(actionToggleActive());

						// Play cheer sound effect, after small delay
						setTimeout(() => {
							if (sound) {
								playAudio("cheer");
							}
						}, 1000);

						// Allow animations to fire before setting next game
						setTimeout(() => {
							// If player has yet to complete the largest grid, level up
							if (gridSize !== 20) {
								newGame(selectedGame, gridSize + 4, false);
							} else {
								// Game over - return to home screen
								store.dispatch(actionBackToHome());
							}
						}, 3000);
					}
				}, 500);
			}
		}
	}
}
