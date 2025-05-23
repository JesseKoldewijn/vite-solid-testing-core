import { prefillThemeProps } from "~/logic/theme/prefill-theme-props";

describe("prefillThemeProps", () => {
	let originalDocument: Document;
	let mockCookie: string;

	beforeEach(() => {
		// Store the original document and cookie
		originalDocument = document;
		mockCookie = document.cookie;

		// Mock the document and its methods
		document = {
			...originalDocument,
			querySelector: vi.fn(),
			cookie: "",
		} as unknown as Document;
	});

	afterEach(() => {
		document = originalDocument; // Restore the original document
		document.cookie = mockCookie; // Restore the original cookie
		vi.clearAllMocks();
	});

	it("should set the theme to 'dark' if no cookie is present", () => {
		const mockHtmlElement = {
			setAttribute: vi.fn(),
			classList: {
				remove: vi.fn(),
			},
		};

		document.querySelector = vi.fn(() => mockHtmlElement) as any;

		prefillThemeProps();

		expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith(
			"data-kb-theme",
			"dark"
		);
		expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith("dark");
		expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith("light");
	});

	it("should set the theme to 'light' if the cookie is set to 'light'", () => {
		const mockHtmlElement = {
			setAttribute: vi.fn(),
			classList: {
				remove: vi.fn(),
			},
		};

		document.querySelector = vi.fn(() => mockHtmlElement) as any;
		document.cookie = "vtc-theme=light";

		prefillThemeProps();

		expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith(
			"data-kb-theme",
			"light"
		);
		expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith("dark");
		expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith("light");
	});

	it("should set the theme to 'dark' if the cookie is set to 'dark'", () => {
		const mockHtmlElement = {
			setAttribute: vi.fn(),
			classList: {
				remove: vi.fn(),
			},
		};

		document.querySelector = vi.fn(() => mockHtmlElement) as any;
		document.cookie = "vtc-theme=dark";

		prefillThemeProps();

		expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith(
			"data-kb-theme",
			"dark"
		);
		expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith("dark");
		expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith("light");
	});

	it("should set the theme to 'dark' if the cookie is set to an unknown value", () => {
		const mockHtmlElement = {
			setAttribute: vi.fn(),
			classList: {
				remove: vi.fn(),
			},
		};

		document.querySelector = vi.fn(() => mockHtmlElement) as any;
		document.cookie = "vtc-theme=unknown";

		prefillThemeProps();

		expect(mockHtmlElement.setAttribute).toHaveBeenCalledWith(
			"data-kb-theme",
			"dark"
		);
		expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith("dark");
		expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith("light");
	});

	it("should set the cookie with the correct path and max-age", () => {
		const mockHtmlElement = {
			setAttribute: vi.fn(),
			classList: {
				remove: vi.fn(),
			},
		};

		document.querySelector = vi.fn(() => mockHtmlElement) as any;
		document.cookie = "vtc-theme=dark";

		prefillThemeProps();

		expect(document.cookie).toContain(
			"vtc-theme=dark; path=/; max-age=31536000; SameSite=Lax;"
		);
	});

	it("should set the cookie with the correct path and max-age when no cookie is present", () => {
		const mockHtmlElement = {
			setAttribute: vi.fn(),
			classList: {
				remove: vi.fn(),
			},
		};

		document.querySelector = vi.fn(() => mockHtmlElement) as any;

		prefillThemeProps();

		expect(document.cookie).toContain(
			"vtc-theme=dark; path=/; max-age=31536000; SameSite=Lax;"
		);
	});
});
