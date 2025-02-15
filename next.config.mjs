import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});
// next.config.mjs
export default {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/raimzhanov.github.io", // Укажи правильное имя репозитория
};
