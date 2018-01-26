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
				<audio id="cheer" preload="auto">
					<source src={require("./../audio/cheer.wav")} type="audio/wav" />
				</audio>
				<audio id="pop" preload="auto">
					<source src={require("./../audio/pop.wav")} type="audio/wav" />
				</audio>
			</div>
		);
	}
}
