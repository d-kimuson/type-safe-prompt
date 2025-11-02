import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  sourcemap: "inline",
  target: "es2022", // >= node18
  format: ["esm", "cjs"],
  tsconfig: "tsconfig.app.json",
  external: [],
});
