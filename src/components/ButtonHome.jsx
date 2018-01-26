import {h, Component} from "preact";

export default class HomeButton extends Component {
	render() {
		const {selectedGame, toggle} = this.props;
		const btnCss = selectedGame === null ? " btn-home_disabled" : "";

		return (
			<button class={`btn btn-home${btnCss}`} onClick={() => toggle()}>
				Home
			</button>
		);
	}
}
