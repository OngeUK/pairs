import {h, Component} from "preact";
import Audio from "./Audio";
import ButtonSound from "./ButtonSound";
import Grid from "./Grid";
import HomeButton from "./ButtonHome";
import LevelComplete from "./LevelComplete";
import Loader from "./Loader";
import newGame from "./../js/newGame";
import playAudio from "./../js/playAudio";
import SelectGame from "./SelectGame";
import selectRandomEmoji from "./../js/selectRandomEmoji";
import speech from "./../js/speech";

export default class App extends Component {
	constructor() {
		super();

		// Bind custom methods
		this.contentLoaded = this.contentLoaded.bind(this);
		this.homeToggle = this.homeToggle.bind(this);
		this.tileInteraction = this.tileInteraction.bind(this);
		this.tilePulse = this.tilePulse.bind(this);
		this.setGame = this.setGame.bind(this);
		this.soundToggle = this.soundToggle.bind(this);
		this.startNewStage = this.startNewStage.bind(this);
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

		// Register service worker (not on dev/serve)
		if (process.env.NODE_ENV === "production") {
			if ("serviceWorker" in navigator) {
				window.addEventListener("load", () => {
					navigator.serviceWorker
						.register("/sw.js")
						.then((registration) => {
							console.log("Registered:", registration);
						})
						.catch((error) => {
							console.log("Registration failed: ", error);
						});
				});
			}
		}
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

	// Toggle to home
	homeToggle() {
		this.setState({
			selectedGame: null
		});

		// Play pop sound effect
		if (this.state.sound) {
			playAudio("pop");
		}
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

	// Set selected game
	setGame(game) {
		this.setState({
			selectedGame: game
		});

		// Start new game
		newGame(this, game);

		// Use speech synthesis API to narrate game title (if sound is enabled)
		if (this.state.sound) {
			speech(game);
		}
	}

	// Flip tile
	tileInteraction(value, element) {
		if (this.state.active) {
			const {gridData, gridSize, sound, currentTile, completed, selectedGame} = this.state;

			// Show selected tile
			gridData[element.id].flipped = true;

			// Play swoosh sound effect
			if (sound) {
				playAudio("swoosh");
			}

			// Update state with new values
			this.setState({
				gridData: gridData
			});

			// If first tile selected
			if (currentTile === null) {
				// Set the id of the item we're trying to match
				this.setState({
					currentTile: {
						tile: element,
						value: value
					}
				});
			} else if (currentTile.tile !== element) {
				// If the two selected tiles do not match
				if (element.dataset.value.toString() !== currentTile.value.toString()) {
					// Disable tile clicks until incorrect pairings have reset
					this.setState({
						active: false
					});

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
							this.tilePulse(parseInt(tile.id));
						}

						// Reset the state for the next go
						this.setState({
							active: true,
							currentTile: null,
							completed: completed + 2
						});

						// Has the player matched all the pairs?
						if (gridSize === this.state.completed) {
							this.setState({
								stageOver: true
							});

							// Play cheer sound effect, after small delay
							setTimeout(() => {
								if (sound) {
									playAudio("cheer");
								}
							}, 1000);

							// Allow emoji reveal to fire before setting next game
							setTimeout(() => {
								// If player has yet to complete the largest grid, level up
								if (gridSize !== 20) {
									newGame(this, selectedGame, gridSize + 4, false);
								} else {
									// Game over - return to home screen
									this.setState({
										selectedGame: null
									});
								}
							}, 3000);
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
					<HomeButton selectedGame={this.state.selectedGame} toggle={this.homeToggle} />
					<ButtonSound on={this.state.sound} toggle={this.soundToggle} />
					{this.state.selectedGame === null ? (
						<SelectGame setGame={this.setGame} />
					) : (
						<Grid
							active={this.state.active}
							sound={this.state.sound}
							gridSize={this.state.gridSize}
							gridData={this.state.gridData}
							selectedGame={this.state.selectedGame}
							tileInteraction={this.tileInteraction}
							tilePulse={this.tilePulse}
						/>
					)}
					<LevelComplete stageOver={this.state.stageOver} startNewStage={this.startNewStage} emoji={this.state.emoji} />
					<Audio />
				</div>
			);
		}

		return <div>{output}</div>;
	}
}
