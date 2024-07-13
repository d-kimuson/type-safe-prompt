// @ts-check
import { jsConfig } from "eslint-config-custom/js-config"
import { tsConfig } from "eslint-config-custom/ts-config"

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigArray} */
const eslintConfig = [
  {
    ignores: ["**/*.?(c|m)js?(x)", "dist", "tsup.config.ts"],
  },
  ...jsConfig,
  ...tsConfig(import.meta.dirname),
]

export default eslintConfig
