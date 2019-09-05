module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub"
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {},
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/__tests__/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  globals: {
    "vue-jest": {
      babelConfig: true
    }
  }
};
