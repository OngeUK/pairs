import {connect} from "preact-redux";
import Tile from "../components/Tile";

// Map state data
function mapStateToProps(state) {
	return {
		global: state.global,
		game: state.game
	};
}

const TileContainer = connect(mapStateToProps)(Tile);

export default TileContainer;
