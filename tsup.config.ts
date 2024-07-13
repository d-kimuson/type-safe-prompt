import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  sourcemap: "inline",
  target: "esnext",
  format: ["esm", "cjs"],
  tsconfig: "tsconfig.json",
  external: [],
})
