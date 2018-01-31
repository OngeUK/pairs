import {h, Component} from "preact";
import formatImageUrl from "./../js/formatImageUrl";

export default class TileData extends Component {
	render() {
		const {selectedGame, cssClass, colour, data} = this.props,
			imageExt = selectedGame === "animals" ? "jpg" : "svg";
		let output;

		// Different games require different structures
		switch (selectedGame) {
			case "animals":
			case "shapes":
				output = (
					<div
						class={`tile tile_front${cssClass}`}
						style={{
							borderColor: `${colour}`,
							backgroundImage: `url("${require(`./../images/${selectedGame}/${formatImageUrl(data.val)}.${imageExt}`)}")`
						}}
					>
						<div class="tile__content">{data.val}</div>
					</div>
				);
				break;
			case "colours":
				output = (
					<div class={`tile tile_front tile_colour${cssClass}`} style={{borderColor: `${colour}`, backgroundColor: `#${data.hex}`}}>
						<div class="tile__content">{data.val}</div>
					</div>
				);
				break;
			case "numbers":
				output = (
					<div
						data-val={data.val}
						class={`tile tile_front tile_number${cssClass}`}
						style={{borderColor: `${colour}`, backgroundColor: `#${data.hex}`}}
					>
						<div class="tile__number">{data.val}</div>
					</div>
				);
				break;
		}

		return <div>{output}</div>;
	}
}
