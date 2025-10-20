module.exports = {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
    testMatch: ["**/*.component.spec.ts"],
    collectCoverage: true
};
