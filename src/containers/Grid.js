import {connect} from "preact-redux";
import Grid from "../components/Grid";

// Map state data
function mapStateToProps(state) {
	return {
		global: state.global,
		game: state.game
	};
}

const GridContainer = connect(mapStateToProps)(Grid);

export default GridContainer;
