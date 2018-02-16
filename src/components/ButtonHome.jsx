import {h, Component} from "preact";
import {actionBackToHome} from "../redux/actions/global";
import playAudio from "../helpers/playAudio";
import {store} from "./../entry.js";

export default class ButtonHome extends Component {
	toggle(sound) {
		store.dispatch(actionBackToHome());

		// Play pop sound effect
		if (sound) {
			playAudio("pop");
		}
	}

	render() {
		const {selectedGame, sound} = store.getState().global,
			btnCss = selectedGame === null ? " btn-home_disabled" : "";

		return (
			<button class={`btn btn-home${btnCss}`} onClick={() => this.toggle(sound)}>
				Home
			</button>
		);
	}
}
