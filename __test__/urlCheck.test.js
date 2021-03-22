import { urlCheck } from "../src/client/js/urlChecker";

describe("Testing url validation functionality for correct urls", function () {
	test("it should match the expected URL", function () {
		const urlRGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
		const urlTest = "https://jestjs.io/"; //accepted URL
		expect(urlRGEX.test(urlTest)).toBe(true);
	});
});

describe("Testing url validation functionality for incorrect urls", () => {
	let url = "How is your day today?"; //not accepted URL
	test("Return true", () => {
		const response = urlCheck(url);
		expect(response).toBeDefined();
		expect(response).toBeFalsy();
	});
});
