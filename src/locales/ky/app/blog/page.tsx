import { Column, Heading, Text } from "@/once-ui/components";
import { Mailchimp } from "@/locales/ky/components";
import { Posts } from "@/locales/ky/components/blog/Posts";
import { baseURL } from "@/locales/ky/app/resources";
import { blog, person, newsletter } from "@/locales/ky/app/resources/content";

export async function generateMetadata() {
  const title = blog.title;
  const description = blog.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/blog`,
      images: [
        {
          url: ogImage,
          alt: title,
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

export default function Blog() {
  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: blog.title,
            description: blog.description,
            url: `https://${baseURL}/blog`,
            image: `https://${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `https://${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Heading marginBottom="m" variant="display-strong-s">
        {blog.title}
      </Heading>
      <Text variant="body-default-m" onBackground="neutral-weak" marginBottom="l">
        Программалоо, санариптик купуялык жана күнүмдүк технологиялар тууралуу макалалар жана видеолор.
      </Text>
      <Column fillWidth flex={1}>
        <Posts columns="2" thumbnail />
      </Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
