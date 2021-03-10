import { urlCheck } from "../src/client/js/urlChecker";

describe("Testing url validation functionality for legitimate urls", function () {
	test("it should match the expected URL", function () {
		const urlRGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
		const urlTest = "https://jestjs.io/"; //accepted URL
		expect(urlRGEX.test(urlTest)).toBe(true);
	});
});

describe("Testing url validation functionality for illegitimate urls", () => {
	var url = "How is your day today?"; //not accepted URL
	test("It should return true", () => {
		const response = urlCheck(url);
		expect(response).toBeDefined();
		expect(response).toBeFalsy();
	});
});
