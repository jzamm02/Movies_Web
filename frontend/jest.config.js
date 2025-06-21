const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  testMatch: [
    "**/app/**/*.test.{ts,tsx,js,jsx}", // run tests in app folder only
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/playwright/", // add the folder where Playwright tests live
  ],
};

module.exports = createJestConfig(customJestConfig);
