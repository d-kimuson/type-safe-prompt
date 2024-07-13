import type { TSESLint } from "@typescript-eslint/utils"

declare const tsConfig: (rootDir: string) => TSESLint.FlatConfig.ConfigArray
