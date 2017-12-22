import {h, Component} from "preact";

export default class Tile extends Component {
	revealTile() {
		this.props.tileInteraction(this.base.dataset.value, this.base);
	}

	render() {
		const {id, value, flipped} = this.props;
		let backFlippedCss = "";
		let frontFlippedCss = "";

		// Set CSS classes to use if tile is flipped
		if (flipped) {
			backFlippedCss = " tile_back-flipped";
			frontFlippedCss = " tile_front-flipped";
		}

		return (
			<div id={id} data-value={value} class="grid__item" onClick={() => this.revealTile()}>
				<div class={`tile tile_back${backFlippedCss}`} />
				<div class={`tile tile_front${frontFlippedCss}`}>
					<div class="tile__content">
						<span style="position: absolute; top: 0; font-size: 3rem; text-align: center; width: 100%;">{value}</span>
					</div>
				</div>
			</div>
		);
	}
}
