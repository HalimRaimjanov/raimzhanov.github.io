import { safeJson } from '@/lib/safe-json';
import { ManagedContent } from '@/components/ManagedContent';
import { notFound } from "next/navigation";
import { CustomMDX } from "@/locales/en/components/mdx";
import { getPosts } from "@/locales/en/app/utils/utils";
import { AvatarGroup, Button, Column, Heading, Row, SmartImage, Text } from "@/once-ui/components";
import { baseURL } from "@/locales/en/app/resources";
import { person } from "@/locales/en/app/resources/content";
import { formatDate } from "@/locales/en/app/utils/formatDate";
import ScrollToHash from "@/locales/en/components/ScrollToHash";

interface BlogParams {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { slug } }: BlogParams) {
  let post = (await getPosts(["src", "app", "blog", "posts"])).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
    team,
  } = post.metadata;
  let ogImage = image && !image.startsWith("data:") ? new URL(image, `https://${baseURL}`).href : `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: BlogParams) {
  let post = (await getPosts(["src", "app", "blog", "posts"])).find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="xs" gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: safeJson({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image && !post.metadata.image.startsWith("data:")
              ? new URL(post.metadata.image, `https://${baseURL}`).href
              : `https://${baseURL}/og?title=${post.metadata.title}`,
            url: `https://${baseURL}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      <Button href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
        Posts
      </Button>
      <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      <Row gap="12" vertical="center">
        {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
        <Text variant="body-default-s" onBackground="neutral-weak">
          {formatDate(post.metadata.publishedAt)}
        </Text>
      </Row>
      {post.managed && post.metadata.image && <SmartImage src={post.metadata.image} alt={post.metadata.title} aspectRatio="16 / 9" radius="m" unoptimized />}
      <Column as="article" fillWidth>
        {post.managed ? <ManagedContent content={post.content} /> : <CustomMDX source={post.content} />}
      </Column>
      <ScrollToHash />
    </Column>
  );
}
