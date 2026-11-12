import catalog from "@/generated/content.json";
type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

type Post = { metadata: Metadata; slug: string; content: string };
// Imported JSON is included in serverless bundles; no runtime source-file access.
export function getPosts(customPath = ["", "", "", ""]): Post[] {
  const section = customPath.slice(-2).join("/");
  const localized = catalog["ky"] as Record<string, Post[]>;
  if (!(section in localized)) throw new Error(`Unknown content section: ${section}`);
  return localized[section];
}
