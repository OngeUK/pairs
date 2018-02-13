/* eslint-disable sort-imports */
import {h, render} from "preact";
import {createStore} from "redux";
import devToolsEnhancer from "remote-redux-devtools";
import {Provider} from "preact-redux";
import {reducers} from "./redux/reducers";

import "./scss/app.scss";
// import {actionLevelComplete} from "./redux/actions/levelComplete";
// import {actionPreloadComplete, actionPreloadFailed, actionPreloadProgress} from "./redux/actions/preload";

const store = createStore(reducers, devToolsEnhancer());

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

	render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.body,
		document.getElementById("app")
	);

	// Log the initial state
	//console.log("Get store", store.getState());

	// Every time the state changes, log it
	// Note that subscribe() returns a function for unregistering the listener
	//const unsubscribe = store.subscribe(() => console.log(store.getState()));

	// Dispatch some actions
	// store.dispatch(actionLevelComplete(true));
	// store.dispatch(actionPreloadProgress(10));
	// store.dispatch(actionPreloadComplete(false));
	// store.dispatch(actionPreloadFailed());

	// Stop listening to state updates
	//unsubscribe();
}

// Enable React DevTools in Preact
require("preact/devtools");

// In development, set up HMR:
if (module.hot) {
	module.hot.accept("./components/app", () => requestAnimationFrame(init));
}

init();
