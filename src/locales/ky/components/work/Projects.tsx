import { getPosts } from "@/locales/ky/app/utils/utils";
import { Column } from "@/once-ui/components";
import { ProjectCard } from "@/locales/ky/components";

interface ProjectsProps {
  range?: [number, number?];
}

export async function Projects({ range }: ProjectsProps) {
  const allProjects = (await getPosts(["src", "app", "work", "projects"]));

  const sortedProjects = allProjects.filter(post=>post.kind!=='channel');

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index === 0 && (!range || range[0] === 1)}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          hasContent={Boolean(post.content.trim())}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
