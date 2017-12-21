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
		// Default app state
		this.setState({
			active: true,
			selectedGame: "default",
			gridSize: 12,
			currentTile: null,
			completed: 0
		});

		// Get state data
		const {gridSize, selectedGame} = this.state;

		// Load grid data from JSON file
		let items = require(`./../data/${selectedGame}.json`);

		// Get random data to form grid
		items = sampleSize(items.data, gridSize / 2);

		// Duplicate so we have a pair of each
		let pairs = [...items, ...items];

		// Randomise again
		pairs = shuffle(pairs);

		this.setState({
			gridData: pairs
		});
	}

	tileInteraction(value, element) {
		if (this.state.active) {
			// Show selected tile
			element.firstChild.className += " tile_back-flipped";
			element.lastChild.className += " tile_front-flipped";

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
				if (parseInt(element.dataset.value) !== this.state.currentTile.value) {
					// Disable tile clicks until incorrect pairings have reset
					this.setState({
						active: false
					});

					// Flip tiles back after a short delay
					setTimeout(() => {
						element.firstChild.className = "tile tile_back";
						element.lastChild.className = "tile tile_front";

						// Hide tiles
						this.state.currentTile.tile.firstChild.className = "tile tile_back";
						this.state.currentTile.tile.lastChild.className = "tile tile_front";

						// Reset the state for the next go
						this.setState({
							active: true,
							currentTile: null
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
						alert("Well done!");
					}
				}
			}
		}
	}

	render() {
		return <Grid gridData={this.state.gridData} tileInteraction={this.tileInteraction} />;
	}
}
