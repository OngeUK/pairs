import {h, Component} from "preact";

export default class LevelComplete extends Component {
	componentWillMount() {
		this.setState({
			reveal: true
		});
	}

	render() {
		const {stageOver, startNewStage, emoji} = this.props,
			{reveal} = this.state,
			css = {
				complete: stageOver ? "" : " level-complete_hide",
				overlay: reveal ? " level-complete__overlay_hide" : "",
				sunbeams: reveal ? " level-complete__sunbeams-bg_hide" : "",
				contents: reveal ? " level-complete__contents_hide" : ""
			};

		let animationStatus = true;

		if (stageOver && reveal && animationStatus) {
			// Reveal sunbeams
			setTimeout(() => {
				animationStatus = false;
				this.setState({
					reveal: false
				});

				// Hide sunbeams
				setTimeout(() => {
					this.setState({
						reveal: true
					});

					// Start next stage/level
					setTimeout(() => {
						animationStatus = true;
						startNewStage();
					}, 500);
				}, 3000);
			}, 1000);
		}

		return (
			<div class={`level-complete${css.complete}`}>
				<div class={`level-complete__overlay${css.overlay}`} />
				<div class="level-complete__sunbeams">
					<div class={`level-complete__sunbeams-bg${css.sunbeams}`} />
				</div>
				<div class={`level-complete__contents${css.contents}`}>
					<span class="level-complete__contents-emoji">
						<img class="level-complete__contents-emoji-img" src={require(`./../images/emoji/${emoji}.svg`)} />
					</span>
				</div>
			</div>
		);
	}
}
