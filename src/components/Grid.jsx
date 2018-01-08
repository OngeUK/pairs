import {h, Component} from "preact";
import Tile from "./Tile";

export default class Grid extends Component {
	render() {
		const {gridSize, gridData, tileInteraction} = this.props;

		return (
			<div class={`container grid-${gridSize}`}>
				<div class="grid">
					{gridData.map((item, i) => {
						return (
							<Tile id={i} value={item.value} colour={item.colour} angle={item.angle} flipped={item.flipped} tileInteraction={tileInteraction} />
						);
					})}
				</div>
			</div>
		);
	}
}
