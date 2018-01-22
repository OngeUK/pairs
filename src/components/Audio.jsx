import {h, Component} from "preact";

export default class Audio extends Component {
	render() {
		return (
			<div>
				<audio id="ding" preload="auto">
					<source src={require("./../audio/ding.wav")} type="audio/wav" />
				</audio>
				<audio id="swoosh" preload="auto">
					<source src={require("./../audio/swoosh.wav")} type="audio/wav" />
				</audio>
			</div>
		);
	}
}
