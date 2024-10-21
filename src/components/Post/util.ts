// from https://twitter.com/Steve8708/status/1504131981444980739
// simplified to a function body of 8 tidy lines
// no loop needed, no 2d array of 3-tuples needed
// just 2 arrays, a findIndex call, and some indexing :)

// from: https://gist.github.com/LewisJEllis/9ad1f35d102de8eee78f6bd081d486ad

function getRelativeTimeString(date: Date | number, lang = "ja"): string {
	const timeMs = typeof date === "number" ? date : date.getTime();
	const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
	const cutoffs = [
		60,
		3600,
		86400,
		86400 * 7,
		86400 * 30,
		86400 * 365,
		Infinity,
	];
	const units: Intl.RelativeTimeFormatUnit[] = [
		"second",
		"minute",
		"hour",
		"day",
		"week",
		"month",
		"year",
	];
	const unitIndex = cutoffs.findIndex(
		(cutoff) => cutoff > Math.abs(deltaSeconds),
	);
	const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;
	const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
	return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

export { getRelativeTimeString };
