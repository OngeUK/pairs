export const actionPreloadComplete = () => ({
	type: "PRELOAD-COMPLETE",
	value: true
});

export const actionPreloadProgress = (number = 0) => ({
	type: "PRELOAD-PROGRESS",
	value: number
});

export const actionPreloadFailed = () => ({
	type: "PRELOAD-FAILED",
	value: true
});
