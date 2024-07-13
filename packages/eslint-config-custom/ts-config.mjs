// @ts-check
import tsEslint from "typescript-eslint"

export const tsConfig = (/** @type {string} */ rootDir) =>
  tsEslint.config(
    ...tsEslint.configs.strictTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          project: [
            "tsconfig.json",
            "tsconfig.app.json",
            "tsconfig.cli.json",
            "tsconfig.test.json",
          ],
          tsconfigRootDir: rootDir,
        },
      },
    },
    {
      files: ["**/*.?(c|m)ts?(x)"],
      rules: {
        "@typescript-eslint/no-floating-promises": [
          "error",
          { ignoreIIFE: true },
        ],
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/consistent-type-assertions": [
          "error",
          {
            assertionStyle: "never",
          },
        ],
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
            args: "after-used",
          },
        ],
        "@typescript-eslint/ban-ts-comment": [
          "error",
          {
            "ts-expect-error": "allow-with-description",
            "ts-ignore": true,
            "ts-nocheck": true,
            "ts-check": false,
            minimumDescriptionLength: 1,
          },
        ],
        "@typescript-eslint/prefer-ts-expect-error": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/no-explicit-any": ["error"],
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/method-signature-style": ["error", "property"],
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      },
    }
  )
