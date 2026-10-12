import { getPosts } from "@/app/utils/utils";
import { Column, Heading, SmartLink, Text } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL } from "@/app/resources";
import { person, work } from "@/app/resources/content";

export async function generateMetadata() {
  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/work/`,
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

export default function Work() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/work`,
            image: `https://${baseURL}/og?title=${encodeURIComponent(work.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/work/${project.slug}`,
              image: project.metadata.image || project.metadata.images[0]
                ? new URL(project.metadata.image || project.metadata.images[0], `https://${baseURL}`).href
                : undefined,
            })),
          }),
        }}
      />
      <Column as="section" fillWidth gap="m" paddingX="l" marginBottom="40">
        <Heading as="h2" variant="heading-strong-xl">Technology education</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          I also run a YouTube channel, explaining technology, digital privacy and online security.
        </Text>
        <SmartLink href="https://www.youtube.com/@HalimRaimzhan" suffixIcon="arrowUpRightFromSquare">
          Visit my YouTube channel
        </SmartLink>
      </Column>
      <Projects />
    </Column>
  );
}
