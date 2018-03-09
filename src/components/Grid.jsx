import {h, Component} from "preact";
import TileContainer from "../containers/Tile";

export default class Grid extends Component {
	render() {
		const {gridData, gridSize} = this.props.game;

		return (
			<div class={`container grid-${gridSize}`}>
				<div class="grid">
					{gridData.map((item, i) => {
						return <TileContainer id={i} data={item.data} colour={item.colour} angle={item.angle} flipped={item.flipped} pulse={item.pulse} />;
					})}
				</div>
			</div>
		);
	}
}
