import {h, Component} from "preact";
import Tile from "./Tile";

export default class Grid extends Component {
	render() {
		const {active, sound, gridSize, gridData, tileInteraction, tilePulse, selectedGame} = this.props;

		return (
			<div class={`container grid-${gridSize}`}>
				<div class="grid">
					{gridData.map((item, i) => {
						return (
							<Tile
								id={i}
								data={item.data}
								colour={item.colour}
								angle={item.angle}
								flipped={item.flipped}
								pulse={item.pulse}
								tileInteraction={tileInteraction}
								tilePulse={tilePulse}
								active={active}
								sound={sound}
								selectedGame={selectedGame}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}
