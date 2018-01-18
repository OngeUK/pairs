import {h, Component} from "preact";
import Grid from "./Grid";
import ButtonSound from "./ButtonSound";
import LevelComplete from "./LevelComplete";
import Loader from "./Loader";
import newGame from "../js/newGame";
import selectRandomEmoji from "../js/selectRandomEmoji";

export default class App extends Component {
	constructor() {
		super();

		// Bind custom methods
		this.tileInteraction = this.tileInteraction.bind(this);
		this.tilePulse = this.tilePulse.bind(this);
		this.soundToggle = this.soundToggle.bind(this);
		this.startNewStage = this.startNewStage.bind(this);
		this.contentLoaded = this.contentLoaded.bind(this);
	}

	componentWillMount() {
		this.setState({
			loading: true // Initiates pre-loader
		});
	}

	componentDidMount() {
		this.setState({
			emoji: selectRandomEmoji() // Emoji transcends games, so set this outside of the game's gridData state
		});
	}

	// Start game when assets have preloaded
	contentLoaded() {
		this.setState({
			loading: false
		});
		newGame(this);
	}

	// Toggle game sound on or off
	soundToggle() {
		this.setState({
			sound: !this.state.sound
		});
	}

	// Pulsate matching tiles
	tilePulse(tileId, type = "add") {
		const {gridData} = this.state,
			value = type === "add";

		gridData[parseInt(tileId)].pulse = value;
	}

	// Reset stageOver state
	startNewStage() {
		this.setState({
			stageOver: false,
			emoji: selectRandomEmoji()
		});
	}

	// Flip tile
	tileInteraction(value, element) {
		if (this.state.active) {
			const {gridData} = this.state;

			// Show selected tile
			gridData[element.id].flipped = true;

			// Update state with new values
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
					// Player matched a pair
					this.setState({
						active: false // Disable tile clicks until matching pair animation fires
					});

					// setTimeouts to allow for transitions/animations to fire first
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
							this.setState({
								stageOver: true
							});

							// Allow animations to fire before setting next game
							setTimeout(() => {
								// If player has yet to complete the largest grid, level up
								if (this.state.gridSize !== 20) {
									newGame(this, this.state.selectedGame, this.state.gridSize + 4);
								} else {
									// Game over - return to home screen
									newGame(this, this.state.selectedGame);
								}
							}, 4000);
						}
					}, 500);
				}
			}
		}
	}

	render() {
		let output;

		if (this.state.loading) {
			output = <Loader contentLoaded={this.contentLoaded} />;
		} else {
			output = (
				<div>
					<ButtonSound on={this.state.sound} toggle={this.soundToggle} />
					<Grid
						active={this.state.active}
						sound={this.state.sound}
						gridSize={this.state.gridSize}
						gridData={this.state.gridData}
						tileInteraction={this.tileInteraction}
						tilePulse={this.tilePulse}
					/>
					<LevelComplete stageOver={this.state.stageOver} startNewStage={this.startNewStage} emoji={this.state.emoji} />
				</div>
			);
		}

		return <div>{output}</div>;
	}
}
