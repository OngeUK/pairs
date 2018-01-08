import {h, Component} from "preact";

// TO DO - split other functions into their own files

export default class Tile extends Component {
	revealTile() {
		// Only applicable on tiles that are not flipped
		if (!this.props.flipped) {
			this.props.tileInteraction(this.base.dataset.value, this.base);
		}
	}

	render() {
		const {id, value, colour, angle, flipped} = this.props;
		let backFlippedCss = "";
		let frontFlippedCss = "";

		// Set CSS classes to use if tile is flipped
		if (flipped) {
			backFlippedCss = " tile_back-flipped";
			frontFlippedCss = " tile_front-flipped";
		}

		return (
			<div id={id} data-value={value} class="grid__item" style={angle} onClick={() => this.revealTile()}>
				<div class={`tile tile_back${backFlippedCss}`} style={{borderColor: `${colour}`}} />
				<div class={`tile tile_front${frontFlippedCss}`} style={{borderColor: `${colour}`}}>
					<div class="tile__content">
						<span style="position: absolute; top: 0; font-size: 3rem; text-align: center; width: 100%;">{value}</span>
					</div>
				</div>
			</div>
		);
	}
}
