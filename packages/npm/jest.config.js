const { compilerOptions } = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { name } = require('./package.json');

module.exports = {
    displayName: name,
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>",
    }),
    name,
    preset: 'ts-jest'
};
