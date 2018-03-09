const dirTree = require("directory-tree"); // https://www.npmjs.com/package/directory-tree
const fs = require("fs");

// Use directory-tree to get all relevant files in the dist directory
const tree = dirTree("./dist/", {exclude: /\.map|.html|.css|.js|.woff|.woff2|.json|.wav|.mp3|.ico|favicon|banner.jpg/});

// Build object containing only the file paths
function getPaths(obj, items = []) {
	for (let x in obj) {
		if (typeof obj[x] === "object") {
			getPaths(obj[x], items);
		} else if (x === "path") {
			if (obj.path.includes(".") && !obj.path.startsWith(".")) {
				items.push(obj.path.replace("dist", "").replace(/\\/g, "/"));
			}
		}
	}
	return {data: items};
}

// Write file
const output = "/* eslint-disable */\nexport const preload = ";

fs.writeFile("src/data/preload.js", `${output}${JSON.stringify(getPaths(tree))}`, (err) => {
	if (err) {
		throw err;
	}
	console.log("preload.js was succesfully built");
});
