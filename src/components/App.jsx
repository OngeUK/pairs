import {h, Component} from "preact";
import Audio from "./Audio";
import ButtonHome from "./ButtonHome";
import ButtonSound from "./ButtonSound";
import GridContainer from "../containers/Grid";
import LevelCompleteContainer from "../containers/LevelComplete";
import LoaderContainer from "../containers/Loader";
import SelectGame from "./SelectGame";

export default class App extends Component {
	componentDidMount() {
		// Register service worker (not on dev/serve)
		if (process.env.NODE_ENV === "production") {
			if ("serviceWorker" in navigator) {
				window.addEventListener("load", () => {
					navigator.serviceWorker
						.register("/sw.js")
						.then((registration) => {
							console.log("Registered:", registration);
						})
						.catch((error) => {
							console.log("Registration failed: ", error);
						});
				});
			}
		}
	}

	render() {
		// Get state data
		const {loading} = this.props.preload,
			{selectedGame} = this.props.global;
		let output;

		if (loading) {
			output = <LoaderContainer />;
		} else {
			output = (
				<div>
					<ButtonHome />
					<ButtonSound />
					{selectedGame === null ? <SelectGame /> : <GridContainer />}
					<LevelCompleteContainer />
					<Audio />
				</div>
			);
		}

		return <div>{output}</div>;
	}
}
