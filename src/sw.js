/* eslint-disable no-undef */

// https://developers.google.com/web/tools/workbox/
importScripts("/libs/workbox/workbox-sw.prod.v2.1.2.js");

const workboxSW = new WorkboxSW({
	skipWaiting: true,
	clientsClaim: true
});

// HTML cache
workboxSW.router.registerRoute(
	new RegExp("/"),
	workboxSW.strategies.staleWhileRevalidate({
		cacheName: "html-cache",
		cacheExpiration: {
			maxEntries: 5
		}
	})
);

// JS cache
workboxSW.router.registerRoute(
	new RegExp(".js$"),
	workboxSW.strategies.staleWhileRevalidate({
		cacheName: "js-cache",
		cacheExpiration: {
			maxEntries: 10
		}
	})
);

// CSS cache
workboxSW.router.registerRoute(
	new RegExp(".css$"),
	workboxSW.strategies.staleWhileRevalidate({
		cacheName: "css-cache",
		cacheExpiration: {
			maxEntries: 10
		}
	})
);

// Image cache
workboxSW.router.registerRoute(
	new RegExp(".(gif|jpe?g|png|svg)$"),
	workboxSW.strategies.staleWhileRevalidate({
		cacheName: "images-cache",
		cacheExpiration: {
			maxEntries: 200
		}
	})
);

// Fonts cache
workboxSW.router.registerRoute(
	new RegExp(".woff?2$"),
	workboxSW.strategies.staleWhileRevalidate({
		cacheName: "fonts-cache",
		cacheExpiration: {
			maxEntries: 5
		}
	})
);

// Audio cache
workboxSW.router.registerRoute(
	new RegExp(".mp3$"),
	workboxSW.strategies.staleWhileRevalidate({
		cacheName: "audio-cache",
		cacheExpiration: {
			maxEntries: 10
		}
	})
);

// Pre-cache CDN content
workboxSW.precache(["https://cdnjs.cloudflare.com/ajax/libs/three.js/88/three.min.js"]);
