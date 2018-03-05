/* eslint-disable sort-imports */
import {h, render} from "preact";
import {createStore} from "redux";
import {Provider} from "preact-redux";
import {reducers} from "./redux/reducers";

import "./scss/app.scss";

export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
	const AppContainer = require("./containers/App").default,
		parent = document.getElementById("app");

	// Different setups are required for serve and build
	if (process.env.NODE_ENV === "production") {
		render(
			<Provider store={store}>
				<AppContainer />
			</Provider>,
			document.body,
			parent
		);
	} else {
		render(
			<Provider store={store}>
				<AppContainer />
			</Provider>,
			parent,
			parent.lastChild
		);
	}
}

// In development, set up HMR:
if (module.hot) {
	module.hot.accept("./containers/App", () => requestAnimationFrame(init));

	// Enable React DevTools in Preact
	require("preact/devtools");
}

init();
