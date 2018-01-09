import {h, Component} from "preact";
import Grid from "./Grid";

const sampleSize = require("lodash/sampleSize"); // https://lodash.com/docs/4.17.4#sampleSize
const shuffle = require("lodash/shuffle"); // https://lodash.com/docs/4.17.4#shuffle
const random = require("lodash/random"); // https://lodash.com/docs/4.17.4#random

// TO DO - split functions into their own files

export default class App extends Component {
	constructor() {
		super();

		// Bind custom methods
		this.tileInteraction = this.tileInteraction.bind(this);
		this.tilePulse = this.tilePulse.bind(this);
	}

	componentWillMount() {
		newGame(this);
	}

	tilePulse(tileId, type = "add") {
		const {gridData} = this.state,
			value = (type === "add");

		gridData[parseInt(tileId)].pulse = value;
	}

	tileInteraction(value, element) {
		if (this.state.active) {
			const {gridData} = this.state;

			// Show selected tile
			gridData[element.id].flipped = true;

			this.setState({
				gridData: gridData
			});

			// If first tile selected
			if (this.state.currentTile === null) {
				// Set the id of the item we're trying to match
				this.setState({
					currentTile: {
						tile: element,
						value: value
					}
				});
			} else if (this.state.currentTile.tile !== element) {
				// If the two selected tiles do not match
				if (element.dataset.value.toString() !== this.state.currentTile.value.toString()) {
					// Disable tile clicks until incorrect pairings have reset
					this.setState({
						active: false
					});

					// Flip tiles back after a short delay
					setTimeout(() => {
						// Hide tiles
						gridData[this.state.currentTile.tile.id].flipped = false;
						gridData[element.id].flipped = false;

						// Player got it wrong - reset the state for the next go
						this.setState({
							active: true,
							currentTile: null,
							gridData: gridData
						});
					}, 1500);
				} else {
					// Player matched a pair - setTimeouts to allow for transitions/animations to fire first
					setTimeout(() => {
						// Get IDs of the pair of tiles
						const pairs = document.querySelectorAll(`div[data-value='${element.dataset.value}']`);

						// Update pulse state
						for (const tile of pairs) {
							this.tilePulse(parseInt(tile.id));
						}

						// Reset the state for the next go
						this.setState({
							active: true,
							currentTile: null,
							completed: this.state.completed + 2
						});

						// Has the player matched all the pairs?
						if (this.state.gridSize === this.state.completed) {
							// If player has yet to complete the largest grid, level up
							if (this.state.gridSize !== 20) {
								alert("Well done!\n👍👍👍");
								newGame(this, this.state.selectedGame, this.state.gridSize + 4);
							} else {
								// Game over - return to home screen
								alert("Game over!");
								newGame(this, this.state.selectedGame);
							}
						}
					}, 500);
				}
			}
		}
	}

	render() {
		return <Grid gridSize={this.state.gridSize} gridData={this.state.gridData} tileInteraction={this.tileInteraction} tilePulse={this.tilePulse} />;
	}
}

// Set up a new game
function newGame(_this, game = "letters", size = 12) {
	// Default app state
	_this.setState({
		active: false,
		selectedGame: game,
		gridSize: size,
		currentTile: null,
		completed: 0
	});

	// Get state data
	const {gridSize, selectedGame} = _this.state;

	// Load grid data from JSON file
	let items = require(`./../data/${selectedGame}.json`);

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
			value: pair,
			flipped: true,
			pulse: false,
			colour: `#${(Math.random() * 0x808080 + 0x808080).toString(16).substring(0, 6)}`,
			angle: number % 2 === 0 ? `transform: rotate(${random(-1.5, 0, true)}deg);` : `transform: rotate(${random(0, 1.5, true)}deg);` // Randomise angle tile item is displayed at
		});
		number++;
	}

	// Add to state
	_this.setState({
		gridData: gridData
	});

	// Have a short delay where you can see all the tiles flipped before playing
	// (This is designed for pre-schoolers, so we don't want to make it too hard!)

	// Hide tiles after a delay (depending on how many tiles are in the grid)
	setTimeout(() => {
		const initialGridData = _this.state.gridData;

		const gridData = initialGridData.map((value) => {
			value.flipped = false;
			return value;
		});

		// Update state to start game
		_this.setState({
			active: true,
			gridData: gridData
		});
	}, 200 * _this.state.gridSize);
}
