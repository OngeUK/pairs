import {h, render} from "preact";

// Import SASS files
import "./scss/core.scss";

// Import assets so these get bundled by Webpack
// import "./../../assets/icon-logo.png";
// import "./../../assets/banner-logo.png";
// import "./manifest.json";

// When in development/serve, require HTML file
if (process.env.NODE_ENV !== "production") {
	require("./index.html");
}

let root;

function init() {
	let App = require("./components/app").default;

	root = render(<App />, document.body, root);

	// render(
	// 	<div class="container">
	// 		<App />
	// 	</div>,
	// 	document.body
	// );
}

// // register ServiceWorker via OfflinePlugin, for prod only:
// if (process.env.NODE_ENV==='production') {
// 	require('./pwa');
// }

// in development, set up HMR:
if (module.hot) {
	require("preact/devtools"); // turn this on if you want to enable React DevTools!
	module.hot.accept("./components/app", () => requestAnimationFrame(init));
}

init();
