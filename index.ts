export default class WordSearch {
	matrix: string[];
	constructor(matrix: string[]) {
		this.matrix = matrix;
	}
	find(words: string[]) {
		let result = {};
		words.forEach((word) => {
			const matrixLength = this.matrix.length;
			for (let i = 0; i < matrixLength; i++) {
				const currentMatrix = this.matrix[i];
				for (let j = 0; j < currentMatrix.length; j++) {
					if (currentMatrix[j] === word[0] && result[word] === undefined) {
						let start = [i + 1, j + 1];
						let end = [i + 1, j + word.length];
						result[word] = {
							start: start,
							end: end,
						};
						// left to right
						for (let k = 0; k < word.length; k++) {
							if (word[k] !== currentMatrix[j + k]) {
								result[word] = undefined;
								break;
							}
						}
						// right to left
						if (result[word] === undefined && j - word.length >= -1) {
							result[word] = {
								start: start,
								end: [i + 1, j - word.length + 2],
							};
							for (let k = 0; k < word.length; k++) {
								if (word[k] !== currentMatrix[j - k]) {
									result[word] = undefined;
									break;
								}
							}
						}
						// bottom to top
						if (result[word] === undefined && i - word.length >= -1) {
							result[word] = {
								start: start,
								end: [i - word.length + 2, j + 1],
							};
							for (let k = 0; k < word.length; k++) {
								if (word[k] !== this.matrix[i - k][j]) {
									result[word] = undefined;
									break;
								}
							}
						}
						// top to bottom
						if (
							result[word] === undefined &&
							matrixLength - i >= word.length - 1
						) {
							result[word] = {
								start: start,
								end: [i + word.length, j + 1],
							};
							for (let k = 0; k < word.length - 1; k++) {
								if (this.matrix[k + i][j] !== word[k]) {
									result[word] = undefined;
									break;
								}
							}
						}
						// top-left to bottom-right
						if (
							result[word] === undefined &&
							matrixLength - i >= word.length - 1
						) {
							result[word] = {
								start: start,
								end: [i + word.length, j + word.length],
							};
							for (let k = 0; k < word.length; k++) {
								if (word[k] !== this.matrix[k + i][j + k]) {
									result[word] = undefined;
									break;
								}
							}
						}
						// top-right to bottom-left
						if (
							result[word] === undefined &&
							matrixLength - i >= word.length - 1
						) {
							result[word] = {
								start: start,
								end: [i + word.length, j - word.length + 2],
							};
							for (let k = 0; k < word.length; k++) {
								if (word[k] !== this.matrix[k + i][j - k]) {
									result[word] = undefined;
									break;
								}
							}
						}
						// bottom-right to top-left
						if (result[word] === undefined && i - word.length >= -1) {
							result[word] = {
								start: start,
								end: [i - word.length + 2, j - word.length + 2],
							};
							for (let k = 0; k < word.length; k++) {
								if (word[k] !== this.matrix[i - k][j - k]) {
									result[word] = undefined;
									break;
								}
							}
						}
						// bottom-left to top-right
						if (result[word] === undefined && i - word.length >= -1) {
							result[word] = {
								start: start,
								end: [i - word.length + 2, j + word.length],
							};
							for (let k = 0; k < word.length; k++) {
								if (word[k] !== this.matrix[i - k][j + k]) {
									result[word] = undefined;
									break;
								}
							}
						}
					}
				}
			}
		});
		return result;
	}
}
