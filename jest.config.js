module.exports = {
  testPathIgnorePatterns: ["/node_modules", "./src/index.tsx"],

  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],

  transform: {
    "^.+\\.(js|jsx|ts|tsx)": "<roootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.tsx", "!./src/**/*.spec.tsx"],
  modulePathIgnorePatterns: ["./src/index.tsx"],
  coverageReporters: ["lcov", "json"],
};
