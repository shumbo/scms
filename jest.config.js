module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts{x}$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
