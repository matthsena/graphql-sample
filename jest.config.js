module.exports = {
  clearMocks: true,
  projects: ["<rootDir>/packages/**/jest.config.js"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["*.spec.ts"]
};
