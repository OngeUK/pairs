import {h, Component} from "preact";
import speech from "./../helpers/speech";
import TileDataContainer from "../containers/TileData";
import {tileInteraction} from "../helpers/tileInteraction";
import {tilePulse} from "../helpers/tilePulse";

export default class Tile extends Component {
	revealTile() {
		const {flipped} = this.props,
			{active} = this.props.game,
			{sound} = this.props.global;

		// Only reveal if tile is not already revealed and game state is active
		if (!flipped && active) {
			const value = this.base.dataset.value;

			// Show tile
			tileInteraction(value, this.base);

			// Use speech synthesis API to narrate tile label (if sound is enabled)
			if (sound) {
				speech(value);
			}
		}
	}

	render() {
		const {id, data, colour, angle, flipped, pulse} = this.props;
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
			<div id={id} data-value={data.val} class={`grid__item${pulseCss}`} onClick={() => this.revealTile()}>
				<div class="tile-wrapper" style={angle}>
					<div class={`tile tile_back${backFlippedCss}`} style={{borderColor: `${colour}`}}>
						<svg class="tile__logo" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M170 80h-70V10c0-5.5-4.5-10-10-10H10C4.5 0 0 4.5 0 10v80c0 5.5 4.5 10 10 10h70v70c0 5.5 4.5 10 10 10h80c5.5 0 10-4.5 10-10V90c0-5.5-4.5-10-10-10z"
								fill={colour}
								fill-opacity="0.1"
							/>
						</svg>
					</div>
					<TileDataContainer cssClass={frontFlippedCss} colour={colour} data={data} />
				</div>
			</div>
		);
	}
}
