import {h, Component} from "preact";
import Grid from "./Grid";

const sampleSize = require("lodash/sampleSize"); // https://lodash.com/docs/4.17.4#sampleSize
const shuffle = require("lodash/shuffle"); // https://lodash.com/docs/4.17.4#shuffle

export default class App extends Component {
	constructor() {
		super();

		// Bind custom method
		this.tileInteraction = this.tileInteraction.bind(this);
	}

	componentWillMount() {
		newGame(this);
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
					// Player matched a pair - reset the state for the next go
					this.setState({
						active: true,
						currentTile: null,
						completed: this.state.completed + 2
					});

					// Has the player matched all the pairs?
					if (this.state.gridSize === this.state.completed) {
						alert("Well done!\n👍👍👍");
						newGame(this);
					}
				}
			}
		}
	}

	render() {
		return <Grid gridSize={this.state.gridSize} gridData={this.state.gridData} tileInteraction={this.tileInteraction} />;
	}
}

// Set up a new game
function newGame(_this) {
	// Default app state
	_this.setState({
		active: false,
		selectedGame: "letters",
		gridSize: 12,
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

	// Build full grid data
	let gridData = [];

	for (const pair of pairs) {
		gridData.push({
			value: pair,
			flipped: true
		});
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
