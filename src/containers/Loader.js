import {actionPreloadProgress, actionPreloadFailed, actionPreloadComplete} from "./../redux/actions/preload";
import {connect} from "preact-redux";
import Loader from "../components/Loader";

// Map state data
function mapStateToProps(state) {
	return {
		preload: state.preload
	};
}

// Map preload related dispatches
function mapDispatchToProps(dispatch) {
	return {
		preloadProgress: (number) => {
			dispatch(actionPreloadProgress(number));
		},
		preloadFailed: () => {
			dispatch(actionPreloadFailed());
		},
		preloadComplete: () => {
			dispatch(actionPreloadComplete());
		}
	};
}

const LoaderContainer = connect(mapStateToProps, mapDispatchToProps)(Loader);

export default LoaderContainer;
