import {h, Component} from "preact";
import {actionDisableActive} from "../redux/actions/game";
import {actionSetGame} from "../redux/actions/global";
import newGame from "../helpers/newGame";
import speech from "../helpers/speech";
import {store} from "./../entry.js";

export default class SelectGame extends Component {
	setGame(game) {
		store.dispatch(actionSetGame(game));
		store.dispatch(actionDisableActive());

		// Start new game
		newGame(game);

		// Use speech synthesis API to narrate game title (if sound is enabled)
		speech(game);
	}

	render() {
		const state = store.getState(),
			{sound} = state.global,
			games = ["Animals", "Colours", "Numbers", "Shapes"];

		return (
			<div class="select-container">
				<h1 class="heading">Select game</h1>
				<div class="game-container">
					{games.map((item) => {
						return (
							<button class="btn btn-game" onClick={() => this.setGame(item.toLowerCase(), sound)}>
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
