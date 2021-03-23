import { handleSubmit } from "../src/client/js/formHandler";
import { mockAxios } from "axios";
import axios from "axios";
let Axios;
let MockAdapter;

describe("Testing if the function is not null", () => {
	test("It should return true", () => {
		expect(handleSubmit).not.toBeNull;
	});
});

// Mock event.preventDefault() with Jest

describe("Mocking preventDefault", () => {
	test("It should mock preventDefault", () => {
		const event = { preventDefault: () => {} };

		// runs before each test starts running
		beforeEach(() => {
			mockAxios = new MockAdapter(Axios);
			jest.spyOn(event, "preventDefault");
		});

		// runs after each test has finished
		afterEach(() => {
			mockAxios.reset();
		});
	});
});

// test("the data is irony", async () => {
// 	const data = await handleSubmit();
// 	expect(data).toBe("irony");
// });
