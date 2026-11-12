import { baseURL } from "@/app/resources";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
