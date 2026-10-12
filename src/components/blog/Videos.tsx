import { videoProjects } from "@/app/resources/videos";
import { getYouTubeId } from "@/app/utils/youtube";
import { Column, Flex, Heading, SmartLink, Text } from "@/once-ui/components";

export function Videos() {
  const videos = videoProjects.flatMap((video) => {
    const id = getYouTubeId(video.youtubeUrl);
    return id && video.title.trim() && video.description.trim() ? [{ ...video, id }] : [];
  });

  if (!videos.length) return null;

  return (
    <Column as="section" lang="en" fillWidth gap="xl" marginBottom="40">
      <Heading as="h2" variant="heading-strong-xl">Technology videos</Heading>
      {videos.map((video) => (
        <Column as="article" key={video.id} fillWidth gap="m">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}`}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ width: "100%", aspectRatio: "16 / 9", border: 0, borderRadius: "var(--radius-l)" }}
          />
          <Heading as="h3" variant="heading-strong-l">{video.title}</Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">{video.description}</Text>
          <Flex gap="24" wrap>
            <SmartLink href={`https://www.youtube.com/watch?v=${video.id}`} suffixIcon="arrowUpRightFromSquare">
              Watch on YouTube
            </SmartLink>
            {video.sourceUrl && <SmartLink href={video.sourceUrl} suffixIcon="arrowUpRightFromSquare">
              View Telegram post
            </SmartLink>}
          </Flex>
        </Column>
      ))}
    </Column>
  );
}
