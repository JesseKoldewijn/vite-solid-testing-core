import { cn } from "~/utils/cn";

describe("cn", () => {
	it("should return the same string when no arguments are passed", () => {
		expect(cn()).toBe("");
	});

	it("should return the same string when a single string is passed", () => {
		expect(cn("test")).toBe("test");
	});

	it("should concatenate multiple strings with a space", () => {
		expect(cn("test1", "test2")).toBe("test1 test2");
	});

	it("should ignore falsy values", () => {
		expect(cn("test1", false, "test2")).toBe("test1 test2");
	});

	it("should ignore empty strings", () => {
		expect(cn("test1", "", "test2")).toBe("test1 test2");
	});

	it("should handle arrays of class names", () => {
		expect(cn(["test1", "test2"])).toBe("test1 test2");
	});

	it("should handle mixed arguments (strings and arrays)", () => {
		expect(cn("test1", ["test2", "test3"], "test4")).toBe(
			"test1 test2 test3 test4"
		);
	});
});
