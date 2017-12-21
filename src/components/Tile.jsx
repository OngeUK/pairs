import {h, Component} from "preact";

export default class Tile extends Component {
	revealTile() {
		this.props.tileInteraction(parseInt(this.base.dataset.value), this.base);
	}

	render() {
		const {id, value} = this.props;

		return (
			<div id={id} data-value={value} class="grid__item" onClick={() => this.revealTile()}>
				<div class="tile tile_back" />
				<div class="tile tile_front">
					<div class="tile__content">
						<span style="position: absolute; top: 0; font-size: 3rem; text-align: center; width: 100%;">{value}</span>
					</div>
				</div>
			</div>
		);
	}
}
