import { render } from "@solidjs/testing-library";
import { App } from "~/_app";

describe("App", () => {
	it("should render the app", () => {
		const container = render(() => <App />);
		expect(container).toBeTruthy();

		// Check if the app has any text content
		const textContent = container.baseElement.textContent;
		expect(textContent).not.toBeNull();
		expect(textContent).not.toBe("");
	});
});
