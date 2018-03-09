import {h, Component} from "preact";
import {actionToggleSound} from "../redux/actions/global";
import {store} from "./../entry.js";

export default class ToggleSound extends Component {
	toggle() {
		store.dispatch(actionToggleSound());
	}

	render() {
		const {sound} = store.getState().global,
			btnCss = sound === "disabled" ? " btn-sound_disabled" : "";

		return (
			<button class={`btn btn-sound${btnCss}`} onClick={() => this.toggle()}>
				Toggle Sound
			</button>
		);
	}
}
