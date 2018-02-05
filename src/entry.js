/* eslint-disable sort-imports */
import {h, render} from "preact";
import "./scss/app.scss";

if (process.env.NODE_ENV !== "production") {
	// When in development/serve, require HTML file
	require("./index.html");
} else {
	// On build, require assets to get these bundled by Webpack
	require("./images/banner.jpg");
	require("./manifest.json");
	require("./favicon.ico");
	require("./favicon-16x16.png");
	require("./favicon-32x32.png");
	require("./sw.js");
	require("./libs/workbox/workbox-sw.prod.v2.1.2.js");
}

function init() {
	let App = require("./components/app").default;

	render(<App />, document.body, document.getElementById("app"));
}

// Enable React DevTools in Preact
require("preact/devtools");

// In development, set up HMR:
if (module.hot) {
	module.hot.accept("./components/app", () => requestAnimationFrame(init));
}

init();
