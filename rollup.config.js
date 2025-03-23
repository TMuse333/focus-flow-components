import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import tailwindConfig from "./tailwind.config.cjs";

export default [
  {
    input: "src/index.ts",
    output: [
      { file: "dist/index.cjs.js", format: "cjs", sourcemap: true },
      { file: "dist/index.esm.js", format: "esm", sourcemap: true }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extensions: [".css"],
        inject: true,
        extract: "index.css",
      }),
    ],
    external: ["react", "react-dom", "next/image", "next/link", "framer-motion"]
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [
      dts({
        respectExternal: true,
        tsconfig: "./tsconfig.json"
      })
    ],
    external: ["./index.css"]
  }
];