import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    index: "src/index.ts",
    constants: "src/constants",
  },
  format: ["cjs", "esm"],
  sourcemap: true,
});
