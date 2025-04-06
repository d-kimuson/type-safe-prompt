// @ts-check
import eslint from "@eslint/js"
import tsEslint from "typescript-eslint"
// @ts-expect-error -- 型定義が提供されていない
import importPlugin from "eslint-plugin-import"
import ununsedImports from "eslint-plugin-unused-imports"

const jsConfig = tsEslint.config(
  {
    ignores: ["dist"],
  },
  eslint.configs.recommended,
  {
    files: ["**/*.?(c|m)js?(x)", "**/*.?(c|m)ts?(x)"],
    plugins: {
      import: importPlugin,
      "unused-imports": ununsedImports,
    },
    settings: {
      /**
       * @see https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
       */
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
        espree: [".js", ".cjs", ".mjs", ".jsx"],
      },
      "import/resolver": {
        typescript: {
          project: ["tsconfig.app.json", "tsconfig.cli.json"],
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    files: ["**/*.?(c|m)js?(x)", "**/*.?(c|m)ts?(x)"],
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "type",
            "internal",
            "parent",
            "index",
            "sibling",
            "object",
            "unknown",
          ],
          pathGroups: [
            {
              pattern: "~/**",
              group: "internal",
              position: "before",
            },
          ],
          alphabetize: {
            order: "asc",
          },
          "newlines-between": "never",
        },
      ],
    },
  }
)

const tsConfig = (/** @type {string} */ rootDir) =>
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

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
const eslintConfig = [
  {
    ignores: ["**/*.?(c|m)js?(x)"],
  },
  ...jsConfig,
  ...tsConfig(import.meta.dirname),
]

export default eslintConfig
