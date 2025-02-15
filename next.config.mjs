import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default withMDX(nextConfig);

/*import mdx from "@next/mdx";

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
  assetPrefix: "/raimzhanov.github.io/", // Правильные пути для статики
};
*/

