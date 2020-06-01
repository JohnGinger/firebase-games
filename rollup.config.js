import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import sass from "rollup-plugin-sass";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";


export default {
  input: "src/GameProvider.tsx",
  output: [
    {
      file: pkg.main,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    url(),
    postcss({
      modules: true,
    }),
    sass({
      output: true,
    }),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    commonjs(),
  ],
};
