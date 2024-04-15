module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true, jest: true },
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  ignorePatterns: ["dist/", "node_modules/", "**/*.css", "**/*.scss"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react-hooks/rules-of-hooks": "warn",
    curly: "error",
    "@typescript-eslint/no-redeclare": "off",
    "no-restricted-globals": "off",
    "no-unused-vars": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/no-empty-interface": "off",
  },
};
