# **Pairs** - Picture matching educational game for children

![alt text](https://pairs.onge.co.uk/images/banner.jpg "Screenshot of Pairs")

## **[Play Pairs in your browser](https://pairs.onge.co.uk/)**

## Introduction

_Pairs_ is a simple picture matching game that I've designed and built to play with my young children. Primarily an offline-first progressive web app designed to be played on a tablet, _Pairs_ can be played on any device using the latest version of a modern browser (no, not you, Internet Explorer).

## Core technologies used

* [Preact](https://preactjs.com/)
* Service Workers, using [Workbox](https://workboxjs.org/)
* CSS3 Grid
* CSS custom properties
* SASS with PostCSS
* [Three.js](https://threejs.org/)
* [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
* HTML5 audio
* [Lodash](https://lodash.com/)
* Webpack 3
* Node
* Yarn

## Features

* HTTP/2 CDN delivery
* Full offline support via Service Workers
* Inlined critical path CSS using [Critical](https://www.npmjs.com/package/critical)
* [PageSpeed Insights](https://www.webpagetest.org) score of 93/100 on mobile and 95/100 on desktop
* 91/100 Progressive Web App score on [Lighthouse](https://developers.google.com/web/tools/lighthouse/)

## Development dependencies

* [Node](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/lang/en/)
* [rimraf](https://www.npmjs.com/package/rimraf)

## Workflow

`yarn`

Install dev dependencies

`yarn serve`

Serve _Pairs_ on localhost webpack-dev-server with Hot Module Reloading

`yarn build`

Build _Pairs_ files for deployment

## Credits

_Pairs_ is built using a collection of third-party resources:

* https://fonts.google.com/specimen/Gloria+Hallelujah &ndash; Web font
* https://www.pexels.com/ &ndash; Royalty-free animal images
* https://freesound.org/ &ndash; Royalty-free sound effects
