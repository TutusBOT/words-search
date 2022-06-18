import { describe } from "vitest";
import { it, expect } from "vitest";
import WordSearch from "./index";

describe("WordSearch", () => {
	it("should return undefined if no occurreces are found", () => {
		const wordSearch = new WordSearch([
			"sdgdfsgfdsg",
			"adfagfg",
			"qasfdfasfdsc",
			"masfdafdsaf",
			"msdfsafl",
			"oqjrwfdfdqiwra",
			"ijqwrafdfafjifmm",
			"mafslsskfasm",
			"koqwssopwqrk",
			"kvuavyfbjch",
		]);

		expect(wordSearch.find(["exists"])).toEqual({
			exists: undefined,
		});
	});

	it("should find occurrences from left to right", () => {
		const wordSearch = new WordSearch([
			"sdgdfsgfdsg",
			"adfagfg",
			"qasfdfasfdsc",
			"masfdafdsaf",
			"msdfsafl",
			"oqjrwfdfdqiwra",
			"ijqwrafdfafjifmm",
			"mafslsskffindmeasm", // findme
			"koqwssopwqrk",
			"kvuavyfbjch",
		]);

		expect(wordSearch.find(["findme"])).toEqual({
			findme: {
				start: [8, 10],
				end: [8, 15],
			},
		});
	});

	it("should find occurrences from right to left", () => {
		const wordSearch = new WordSearch([
			"sdgdfsgfdsg",
			"adfagfg",
			"qasfdfasfdsc",
			"masfdafdsaf",
			"msdfsafl",
			"oqjrwfdfdqiwra",
			"ijqwrafdfafjifmm",
			"sadfdasfadsfsf",
			"koqwssopwqrk",
			"kvuavyemdnifbjch", // emdnif
		]);

		expect(wordSearch.find(["findme"])).toEqual({
			findme: {
				start: [10, 12],
				end: [10, 7],
			},
		});
	});

	it("should find occurrences from top to bottom", () => {
		const wordSearch = new WordSearch([
			"abcdefghif", // f
			"saggsasagi", // i
			"qwopjrpqin", // n
			"mfaslkfmsd", // d
			"msflksmafm", // m
			"oqjrwqiwre", // e
			"ijqwrjifmm",
			"mafslkfasm",
			"koqwopwqrk",
			"kvuvyfbjch",
		]);

		expect(wordSearch.find(["findme"])).toEqual({
			findme: {
				start: [1, 10],
				end: [6, 10],
			},
		});
	});

	it("should find occurrences from bottom to top", () => {
		const wordSearch = new WordSearch([
			"abcdefghij",
			"saggsasagg",
			"qwopjrpqis",
			"mfaslkfmsa",
			"esflksmafl", // e
			"mqjrwqiwra", // m
			"djqwrjifmm", // d
			"nafslkfasm", // n
			"ioqwopwqrk", // i
			"fvuvyfbjch", // f
		]);

		expect(wordSearch.find(["findme"])).toEqual({
			findme: {
				start: [10, 1],
				end: [5, 1],
			},
		});
	});

	it("should find occurrences from top-left to bottom-right", () => {
		const wordSearch = new WordSearch([
			"fbcdefghij", // f
			"siggsasagg", //  i
			"qwnpjrpqis", //   n
			"mfadlkfmsa", //    d
			"msflmsmafl", //	 m
			"oqjrweiwra", //	  e
			"ijqwrjifmm",
			"mafslkfasm",
			"koqwopwqrk",
			"kvuvyfbjch",
		]);

		expect(wordSearch.find(["findme"])).toEqual({
			findme: {
				start: [1, 1],
				end: [6, 6],
			},
		});
	});

	it("should find occurrences from bottom-right to top-left", () => {
		const wordSearch = new WordSearch([
			"abcdefghij",
			"saggsasagg",
			"qwopjrpqis",
			"mfaelkfmsa", // e
			"msflmsmafl", //  m
			"oqjrwdiwra", //   d
			"ijqwrjnfmm", //    n
			"mafslkfism", //     i
			"koqwopwqfk", //      f
			"kvuvyfbjch",
		]);

		expect(wordSearch.find(["findme"])).toEqual({
			findme: {
				start: [9, 9],
				end: [4, 4],
			},
		});
	});

	it("should find occurrences from bottom-left to top-right", () => {
		const wordSearch = new WordSearch([
			"abcaeeghij", //      e
			"savgmasagg", //     m
			"qaodjrpqis", //    d
			"jfnslkfmsa", //   n
			"miflksmafl", //  i
			"fqjrwqiwra", // f
			"ijqwrjifmm",
			"mafslkfasm",
			"koqwopwqrk",
			"kvuvyfbjch",
		]);

		expect(wordSearch.find(["findme"])).toEqual({
			findme: {
				start: [6, 1],
				end: [1, 6],
			},
		});
	});

	it("should find occurrences from top-right to bottom-left", () => {
		const wordSearch = new WordSearch([
			"abcjefghij", //      e
			"saagiasagg", //     m
			"qvonjrpqis", //    d
			"afdslkfmsa", //   n
			"mmflksmafl", //  i
			"eqjrwqiwra", // f
			"ijqwrjifmm",
			"mafslkfasm",
			"koqwopwqrk",
			"kvuvyfbjch",
		]);

		expect(wordSearch.find(["findme"])).toEqual({
			findme: {
				start: [1, 6],
				end: [6, 1],
			},
		});
	});

	it("should find multiple occurrences with the same letter arrangement", () => {
		const wordSearch = new WordSearch([
			"abcdefghij",
			"saggsasagg",
			"qwopjrpqis",
			"mfaylkfmsa",
			"msftksmafl",
			"oqjhwqiwra",
			"ijqorjifmm",
			"mafnlkfasm",
			"koqmetoork", // metoo
			"kvfindmech", // findme
		]);

		expect(wordSearch.find(["findme", "metoo"])).toEqual({
			findme: {
				start: [10, 3],
				end: [10, 8],
			},
			metoo: {
				start: [9, 4],
				end: [9, 8],
			},
		});
	});

	it("should find multiple occurrences with different letter arrangement", () => {
		const wordSearch = new WordSearch([
			"mbcdefghij", // m
			"eaggsasagg", // e
			"twopjrpqis", // t
			"ofaylkfmsa", // o
			"osftksmafl", // o
			"oqjhwqiwra",
			"ijqorjifmm",
			"mafnlkfasm",
			"koqmdofork",
			"kvfindmech", // findme
		]);

		expect(wordSearch.find(["findme", "metoo"])).toEqual({
			findme: {
				start: [10, 3],
				end: [10, 8],
			},
			metoo: {
				start: [1, 1],
				end: [5, 1],
			},
		});
	});
});
