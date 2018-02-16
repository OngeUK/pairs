import {h, Component} from "preact";
import {actionBackToHome} from "../redux/actions/global";
import playAudio from "../helpers/playAudio";
import {store} from "./../entry.js";

export default class ButtonHome extends Component {
	toggle() {
		store.dispatch(actionBackToHome());

		// Play pop sound effect
		playAudio("pop");
	}

	render() {
		const {selectedGame} = store.getState().global,
			btnCss = selectedGame === null ? " btn-home_disabled" : "";

		return (
			<button class={`btn btn-home${btnCss}`} onClick={() => this.toggle()}>
				Home
			</button>
		);
	}
}
