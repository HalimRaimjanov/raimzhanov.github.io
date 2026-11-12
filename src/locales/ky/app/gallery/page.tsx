import { getContent } from '@/lib/content-server';
import { safeJson } from '@/lib/safe-json';
import { Column, Heading, Text } from "@/once-ui/components";
import MasonryGrid from "@/locales/ky/components/gallery/MasonryGrid";
import { baseURL } from "@/locales/ky/app/resources";
import { gallery, person } from "@/locales/ky/app/resources/content";

export async function generateMetadata() {
  const title = gallery.title;
  const description = gallery.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/gallery`,
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

export default async function Gallery() {
 const photos=(await getContent('ky','gallery')).map(post=>({src:post.metadata.image!,alt:post.metadata.title}));
  return (
    <Column fillWidth gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: safeJson({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: gallery.title,
            description: gallery.description,
            url: `https://${baseURL}/gallery`,
            image: photos.map((image) => ({
              "@type": "ImageObject",
              url: image.src.startsWith("data:") ? undefined : new URL(image.src, `https://${baseURL}`).href,
              description: image.alt,
            })),
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
      <Column gap="s">
        <Heading as="h1" variant="display-strong-s">{gallery.title}</Heading>
        <Text onBackground="neutral-weak">Жашоодогу көз ирмемдер, жерлер жана портреттер. Сүрөттү толук көрүү үчүн басыңыз.</Text>
      </Column>
      <MasonryGrid photos={photos} />
    </Column>
  );
}
