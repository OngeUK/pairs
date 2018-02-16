import {actionToggleShowEmoji, actionToggleStageOver, actionToggleActive} from "../redux/actions/game";
import {actionSetEmoji} from "../redux/actions/global";
import {connect} from "preact-redux";
import LevelComplete from "../components/LevelComplete";

// Map state data
function mapStateToProps(state) {
	return {
		global: state.global,
		game: state.game
	};
}

// Map level complete related dispatches
function mapDispatchToProps(dispatch) {
	return {
		setEmoji: (emoji) => {
			dispatch(actionSetEmoji(emoji));
		},
		toggleShowEmoji: () => {
			dispatch(actionToggleShowEmoji());
		},
		toggleActive: () => {
			dispatch(actionToggleActive());
		},
		toggleStageOver: () => {
			dispatch(actionToggleStageOver());
		}
	};
}

const LevelCompleteContainer = connect(mapStateToProps, mapDispatchToProps)(LevelComplete);

export default LevelCompleteContainer;
