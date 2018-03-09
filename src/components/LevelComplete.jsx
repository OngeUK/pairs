import {h, Component} from "preact";
import selectRandomEmoji from "./../helpers/selectRandomEmoji";

export default class LevelComplete extends Component {
	componentWillMount() {
		this.props.setEmoji(selectRandomEmoji());
	}

	render() {
		const {stageOver, showEmoji, active} = this.props.game,
			{emoji} = this.props.global,
			css = {
				complete: stageOver ? "" : " level-complete_hide",
				overlay: showEmoji ? "" : " level-complete__overlay_hide",
				sunbeams: showEmoji ? "" : " level-complete__sunbeams-bg_hide",
				contents: showEmoji ? "" : " level-complete__contents_hide"
			};

		if (stageOver && !active) {
			this.props.toggleActive();
			// Reveal sunbeams
			setTimeout(() => {
				this.props.toggleShowEmoji();
			}, 1000);

			// Hide sunbeams
			setTimeout(() => {
				this.props.toggleShowEmoji();

				// Start next stage/level
				setTimeout(() => {
					// Stage over
					this.props.toggleStageOver();
					this.props.toggleActive();
					this.props.setEmoji(selectRandomEmoji());
				}, 500);
			}, 4000);
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
