import {connect} from "preact-redux";
import Loader from "../components/Loader";

function mapStateToProps(state) {
	return state.preload;
}

const LoaderContainer = connect(mapStateToProps)(Loader);

export default LoaderContainer;
