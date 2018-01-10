import {h, Component} from "preact";

export default class ToggleSound extends Component {
	render() {
		const {on, toggle} = this.props;
		const btnCss = !on ? " btn-sound_disabled" : "";

		return (
			<button class={`btn-sound${btnCss}`} onClick={() => toggle()}>
				Toggle Sound
			</button>
		);
	}
}
