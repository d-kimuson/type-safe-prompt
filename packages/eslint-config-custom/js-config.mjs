// @ts-check
import eslint from "@eslint/js"
import tsEslint from "typescript-eslint"

// @ts-expect-error -- 型定義が提供されていない
import importPlugin from "eslint-plugin-import"
import ununsedImports from "eslint-plugin-unused-imports"

export const jsConfig = tsEslint.config(
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
          project: [
            "tsconfig.json",
            "tsconfig.app.json",
            "tsconfig.cli.json",
            "tsconfig.test.json",
          ],
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
