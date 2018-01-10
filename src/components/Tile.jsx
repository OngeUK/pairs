import {h, Component} from "preact";

export default class Tile extends Component {
	revealTile() {
		const {flipped, active, sound, tileInteraction} = this.props;

		// Only reveal if tile is not already revealed and game state is active
		if (!flipped && active) {
			const value = this.base.dataset.value;

			// Show tile
			tileInteraction(value, this.base);

			// Use speech synthesis API to narrate tile label (if sound is enabled)
			if (("speechSynthesis" in window) && sound) {
				// Create speech synthesis utterance object
				const utterance = new SpeechSynthesisUtterance(value);

				// Configure utterance
				utterance.lang = "en-GB";
				utterance.volume = 1;
				utterance.rate = 1;
				utterance.pitch = 1;

				// Stop any current utterances
				window.speechSynthesis.cancel();

				// Narrate utterance
				window.speechSynthesis.speak(utterance);
			}
		}
	}

	render() {
		const {id, value, colour, angle, flipped, pulse, tilePulse} = this.props;
		let backFlippedCss = "",
			frontFlippedCss = "",
			pulseCss = "";

		// Set CSS classes to use if tile is flipped
		if (flipped) {
			backFlippedCss = " tile_back-flipped";
			frontFlippedCss = " tile_front-flipped";
		}

		// Set CSS class to use if the tile should pulse
		if (pulse) {
			pulseCss = " grid__item_pulse";

			// Update state to remove pulse after animation fires
			setTimeout(() => {
				tilePulse(id, "remove");
			}, 500);
		}

		return (
			<div id={id} data-value={value} class={`grid__item${pulseCss}`} onClick={() => this.revealTile()}>
				<div class="tile-wrapper" style={angle}>
					<div class={`tile tile_back${backFlippedCss}`} style={{borderColor: `${colour}`}}>
						<svg class="tile__logo" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg"><path d="M170 80h-70V10c0-5.5-4.5-10-10-10H10C4.5 0 0 4.5 0 10v80c0 5.5 4.5 10 10 10h70v70c0 5.5 4.5 10 10 10h80c5.5 0 10-4.5 10-10V90c0-5.5-4.5-10-10-10z" fill={colour} fill-opacity="0.1" /></svg>
					</div>
					<div
						class={`tile tile_front${frontFlippedCss}`}
						style={{borderColor: `${colour}`, backgroundImage: `url("${require(`./../images/${formatImageUrl(value)}.jpg`)}")`}}
					>
						<div class="tile__content">{value}</div>
					</div>
				</div>
			</div>
		);
	}
}

function formatImageUrl(value) {
	return value.replace(" ", "-").toLowerCase();
}
