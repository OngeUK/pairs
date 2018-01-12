import {h, Component} from "preact";

export default class LevelComplete extends Component {
	componentWillMount() {
		this.setState({
			applyCssClasses: true
		});
	}

	render() {
		const {stageOver, startNewStage, emoji} = this.props,
			{applyCssClasses} = this.state,
			css = {
				complete: stageOver ? "" : " level-complete_hide",
				overlay: applyCssClasses ? " level-complete__overlay_hide" : "",
				sunbeams: applyCssClasses ? " level-complete__sunbeams-bg_hide" : "",
				contents: applyCssClasses ? " level-complete__contents_hide" : ""
			};

		let animationStatus = true;

		if (stageOver && applyCssClasses && animationStatus) {
			// Reveal sunbeams
			setTimeout(() => {
				animationStatus = false;
				this.setState({
					applyCssClasses: false
				});

				// Hide sunbeams
				setTimeout(() => {
					this.setState({
						applyCssClasses: true
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
					<span class="level-complete__contents-emoji">{emoji}</span>
				</div>
			</div>
		);
	}
}
