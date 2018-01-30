import {h, Component} from "preact";

export default class SelectGame extends Component {
	render() {
		const {setGame} = this.props,
			games = ["Animals", "Colours", "Shapes"];

		return (
			<div class="select-container">
				<h1 class="heading">Select game</h1>
				<div class="game-container">
					{games.map((item) => {
						return (
							<button class="btn btn-game" onClick={() => setGame(item.toLowerCase())}>
								<div class={`game-select game-select_${item.toLowerCase()}`} />
								{item}
							</button>
						);
					})}
				</div>
			</div>
		);
	}
}
