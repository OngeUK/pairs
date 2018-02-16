import App from "../components/App";
import {connect} from "preact-redux";

// Map state data
function mapStateToProps(state) {
	return {
		preload: state.preload,
		game: state.game,
		global: state.global
	};
}

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
