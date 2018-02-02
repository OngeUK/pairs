/* eslint-disable sort-imports */
import "./scss/app.scss";
import {h, render} from "preact";

// Import assets so these get bundled by Webpack
// import "./../../assets/icon-logo.png";
// import "./../../assets/banner-logo.png";
// import "./manifest.json";
// import "./sw.js";
// import "./libs/workbox/workbox-sw.prod.v2.1.2.js";

if (process.env.NODE_ENV !== "production") {
	// When in development/serve, require HTML file
	require("./index.html");
} else {
	// On build, require assets to get these bundled by Webpack
	// import "./../../assets/icon-logo.png";
	require("./images/banner.jpg");
	require("./manifest.json");
	require("./sw.js");
	require("./libs/workbox/workbox-sw.prod.v2.1.2.js");
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
