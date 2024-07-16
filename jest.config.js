<<<<<<< HEAD
  /** @type {import('jest').Config} */
const config = {
  verbose: true,
  setupFiles: ["<rootDir>/jest.setup.js"],
  transform: {},
  forceExit: true,
};
export default config;
=======
/** @type {import('jest').Config} */
const config = {
  forceExit: true,
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  testEnvironment: "node",
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
>>>>>>> 0171158104f409d1f7bcd2bbe68f23274c171083
