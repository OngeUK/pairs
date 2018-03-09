import {h, Component} from "preact";
import {preload} from "./../data/preload.js";

export default class Loader extends Component {
	constructor() {
		super();

		// Bind custom method
		this.loadAssets = this.loadAssets.bind(this);
	}

	componentWillMount() {
		this.loadAssets();
	}

	// Pre-load all assets
	loadAssets() {
		const props = this.props;

		// Load grid data from JSON file
		const jsonData = preload,
			items = jsonData.data;
		const len = items.length;
		let loaded = 0;

		// Promise.all requires as array of promises, so build that here
		const toLoad = (items) => {
			return new Promise((resolve, reject) => {
				// Create new image
				const img = new Image();

				// When image has loaded
				img.onload = () => {
					// Resolve the promise with the image URL
					resolve(items);

					// Increment number of images loaded
					loaded++;

					// Update percentage loaded state value
					props.preloadProgress(loaded / len * 100);
				};

				// Problem loading image
				img.onerror = (err) => {
					reject(err);
				};

				// Add image source
				img.src = items;
			});
		};

		// Pre-load all assets
		Promise.all(items.map(toLoad))
			.then(() => {
				// All assets have loaded, so start the game
				props.preloadComplete(true);
			})
			.catch(() => {
				// Update error state
				props.preloadFailed();
			});
	}

	render() {
		const {percentage, error} = this.props.preload;

		const mask = (
			<svg width="0" height="0">
				<defs>
					<clipPath id="mask">
						<path
							class="st0"
							d="M170,80h-70V10c0-5.5-4.5-10-10-10H10C4.5,0,0,4.5,0,10v80c0,5.5,4.5,10,10,10h70v70c0,5.5,4.5,10,10,10h80c5.5,0,10-4.5,10-10V90C180,84.5,175.5,80,170,80z"
						/>
					</clipPath>
				</defs>
			</svg>
		);

		return (
			<div>
				{error ? (
					<p class="loader-error">Error loading game. Please try again.</p>
				) : (
					<div class="loader loader-wrapper">
						<div class="loader loader_progress" style={{width: `${percentage}%`}}>
							{mask}
						</div>
					</div>
				)}
			</div>
		);
	}
}
