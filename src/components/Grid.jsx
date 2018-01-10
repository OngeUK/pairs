import {h, Component} from "preact";
import Tile from "./Tile";

export default class Grid extends Component {
	render() {
		const {active, sound, gridSize, gridData, tileInteraction, tilePulse} = this.props;

		return (
			<div class={`container grid-${gridSize}`}>
				<div class="grid">
					{gridData.map((item, i) => {
						return (
							<Tile id={i} value={item.value} colour={item.colour} angle={item.angle} flipped={item.flipped} pulse={item.pulse} tileInteraction={tileInteraction} tilePulse={tilePulse} active={active} sound={sound} />
						);
					})}
				</div>
			</div>
		);
	}
}
