/** Entry point JavaScript file **/

// // Register Service Worker
// if ("serviceWorker" in navigator) {
// 	window.addEventListener("load", function() {
// 		navigator.serviceWorker.register("sw.js").then(function(registration) {
// 		// Registration was successful
// 			console.log("ServiceWorker registration successful with scope: ", registration.scope);
// 		}, function(err) {
// 		// registration failed :(
// 			console.log("ServiceWorker registration failed: ", err);
// 		});
// 	});
// }

// Import SASS files
import "./../scss/core.scss";

// Import assets so these get bundled by Webpack
// import "./../../assets/icon-logo.png";
// import "./../../assets/banner-logo.png";
// import "./manifest.json";

// When in development/serve, require HTML file
if (process.env.NODE_ENV !== "production") {
	require("./../index.html");
}

// Add <App /> stuff here?
// Be the grid to start off with
