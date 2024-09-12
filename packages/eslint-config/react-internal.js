const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * これはReactを利用する内部ライブラリ用のカスタムBiome設定です。
 */

/** @type {import("biome").Config} */
module.exports = {
  extends: ["biome:recommended", "turbo"],
  plugins: ["only-warn"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // ドットファイルを無視
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    // .tsxファイルを強制的に検出
    { files: ["*.js?(x)", "*.ts?(x)"] },
  ],
};
