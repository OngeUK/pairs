import {h, Component} from "preact";

export default class Tile extends Component {
	revealTile() {
		// Only applicable on tiles that are not flipped
		if (!this.props.flipped) {
			this.props.tileInteraction(this.base.dataset.value, this.base);
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
					<div class={`tile tile_back${backFlippedCss}`} style={{borderColor: `${colour}`}} />
					<div class={`tile tile_front${frontFlippedCss}`} style={{borderColor: `${colour}`}}>
						<div class="tile__content">
							<span style="position: absolute; top: 0; font-size: 3rem; text-align: center; width: 100%;">{value}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
