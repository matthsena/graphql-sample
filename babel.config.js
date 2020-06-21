module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@graphql-sailboat": "./src/@graphql-func",
        },
      },
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
