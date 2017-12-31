import babel from "rollup-plugin-babel";

// rollup.config.js
export default {
  input: "src/main.js",
  plugins: [
    babel({
      exclude: "node_modules/**",
      plugins: [
        "external-helpers",
        "transform-decorators-legacy",
        "transform-class-properties"
      ],
      externalHelpers: true,
      presets: [
          ['es2015', { modules: false }], 'stage-0', 'react'
      ]
    })
  ],
  output: {
    file: "bundle.js",
    format: "cjs"
  }
};
