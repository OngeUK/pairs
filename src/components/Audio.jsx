import {h, Component} from "preact";

export default class Audio extends Component {
	render() {
		return (
			<div>
				<audio id="ding" preload="auto">
					<source src={require("./../audio/ding.mp3")} type="audio/mpeg" />
				</audio>
				<audio id="swoosh" preload="auto">
					<source src={require("./../audio/swoosh.mp3")} type="audio/mpeg" />
				</audio>
				<audio id="swooshes" preload="auto">
					<source src={require("./../audio/swooshes.mp3")} type="audio/mpeg" />
				</audio>
				<audio id="cheer" preload="auto">
					<source src={require("./../audio/cheer.mp3")} type="audio/mpeg" />
				</audio>
				<audio id="pop" preload="auto">
					<source src={require("./../audio/pop.mp3")} type="audio/mpeg" />
				</audio>
			</div>
		);
	}
}
