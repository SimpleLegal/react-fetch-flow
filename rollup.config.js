import babel from "rollup-plugin-babel";

export default {
  entry: "src/index.js",
  targets: [{ dest: "dist/index.js", format: "es" }],
  plugins: [
    babel({
      exclude: ["node_modules/**"],
      plugins: ["transform-decorators-legacy", "transform-class-properties"],
      presets: [
        ["es2015", { "modules": false }],
        "react",
        "stage-0"
      ]
    })
  ]
};
