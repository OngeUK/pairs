import {h, Component} from "preact";
import formatImageUrl from "./../js/formatImageUrl";

export default class TileData extends Component {
	render() {
		const {selectedGame, cssClass, colour, value} = this.props;
		let output;

		// Different games require different structures
		switch (selectedGame) {
			case "animals":
				output = (
					<div
						class={`tile tile_front${cssClass}`}
						style={{borderColor: `${colour}`, backgroundImage: `url("${require(`./../images/${formatImageUrl(value)}.jpg`)}")`}}
					>
						<div class="tile__content">{value}</div>
					</div>
				);
				break;
			case "colours":
				output = (
					<div
						data-value={value.toLowerCase()}
						class={`tile tile_front tile_colour${cssClass}`}
						style={{borderColor: `${colour}`, backgroundColor: `${value}`}}
					>
						<div class="tile__content">{value}</div>
					</div>
				);
				break;
		}

		return <div>{output}</div>;
	}
}
