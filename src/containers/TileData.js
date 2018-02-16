import {connect} from "preact-redux";
import TileData from "../components/TileData";

// Map state data
function mapStateToProps(state) {
	return {
		global: state.global
	};
}

const TileDataContainer = connect(mapStateToProps)(TileData);

export default TileDataContainer;
