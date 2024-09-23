import sharedConfig from "@repo/ui/tailwind.config";

// TailwindCSSの設定オブジェクトを定義します。
// contentとpresetsプロパティを含みます。
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [sharedConfig],
};

export default config;
