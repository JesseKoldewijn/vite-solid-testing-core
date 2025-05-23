/// <reference types="vitest" />

import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import type { TestProjectConfiguration } from "vitest/config";

import tailwindcss from "@tailwindcss/vite";

import { resolve } from "path";

export const basePath = resolve(__dirname, "./");
export const getAbsolutePath = (path: string) => resolve(basePath, path);

const clientProjects: TestProjectConfiguration[] = [
	getAbsolutePath("./src"),
	{
		test: {
			name: "Client: Integration Tests",
			globals: true,
			setupFiles: [getAbsolutePath("./tests/setup.ts")],
			include: [
				getAbsolutePath("./tests/integration/**/*.client.test.*"),
			],
			environment: "happy-dom",
			alias: {
				"~": getAbsolutePath("./src"),
				"~tests": getAbsolutePath("./tests"),
			},
		},
	},
	{
		test: {
			name: "Client: Unit Tests",
			globals: true,
			setupFiles: [getAbsolutePath("./tests/setup.ts")],
			include: [getAbsolutePath("./tests/unit/**/*.client.test.*")],
			environment: "happy-dom",
			alias: {
				"~": getAbsolutePath("./src"),
				"~tests": getAbsolutePath("./tests"),
			},
		},
	},
	{
		test: {
			name: "Client: Render Tests",
			globals: true,
			setupFiles: [getAbsolutePath("./tests/setup.ts")],
			include: [getAbsolutePath("./tests/render/**/*.client.test.*")],
			environment: "happy-dom",
			alias: {
				"~": getAbsolutePath("./src"),
				"~tests": getAbsolutePath("./tests"),
			},
		},
		plugins: [solid(), tailwindcss() as any],
	},
];

const projects = [...clientProjects];

export default defineConfig({
	plugins: [solid(), tailwindcss() as any],
	server: {
		port: 3000,
		host: "0.0.0.0",
	},
	build: {
		target: "esnext",
		cssMinify: "lightningcss",
	},
	test: {
		globals: true,
		setupFiles: ["./tests/setup.ts"],
		projects,
		environment: "happy-dom",
		// if you have few tests, try commenting this
		// out to improve performance:
		// isolate: false,
	},
	resolve: {
		conditions: ["development", "browser"],
		alias: {
			"~": getAbsolutePath("./src"),
			"~tests": getAbsolutePath("./tests"),
		},
	},
});
