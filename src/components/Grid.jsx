import {h, Component} from "preact";
import Tile from "./Tile";

export default class Grid extends Component {
	render() {
		return (
			<div class="container">
				<div class="grid">
					{this.props.gridData.map((value, i) => {
						return <Tile key={i} id={`item-${i}`} value={value} tileInteraction={this.props.tileInteraction} />;
					})}
				</div>
			</div>
		);
	}
}
