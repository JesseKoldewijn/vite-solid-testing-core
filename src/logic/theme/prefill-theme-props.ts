/**
 * The function `prefillThemeProps` sets the theme of the HTML parent element based on a cookie value
 * or defaults to "dark".
 */
export const prefillThemeProps = () => {
	const htmlParentFromRoot = document?.querySelector("html");
	if (htmlParentFromRoot) {
		const cookieString = document.cookie;
		const cookieArray = cookieString.split("; ");
		const cookieObject: { [key: string]: string } = {};
		cookieArray.forEach((cookie) => {
			const [key, value] = cookie.split("=");
			cookieObject[key] = decodeURIComponent(value);
		});

		const themeCookie = cookieObject["vtc-theme"];
		const currentTheme = themeCookie === "light" ? "light" : "dark";
		htmlParentFromRoot.setAttribute("data-kb-theme", currentTheme);
		htmlParentFromRoot.classList.remove("dark");
		htmlParentFromRoot.classList.remove("light");

		document.cookie = `vtc-theme=${currentTheme}; path=/; max-age=31536000; SameSite=Lax;`;
	}
};
