/* @refresh reload */
import "./styles/tailwind.css";
import { render } from "solid-js/web";
import { App } from "./_app.tsx";
import { prefillThemeProps } from "./logic/theme/prefill-theme-props.ts";

const root = document.getElementById("root");

prefillThemeProps();

render(() => <App />, root!);
