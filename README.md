# Portfolio

Personal portfolio built with Next.js 14, React and Once UI.

## Local development

```sh
npm ci
npm run dev
```

## Validation

```sh
npx tsc --noEmit
npm run build
```

The build downloads Google Fonts and requires network access.

## Video projects

Edit `src/app/resources/videos.ts` to add a title, description and YouTube URL.
Videos appear on `/blog` in array order. Standard watch links, share links,
Shorts and live links are supported. The server renders the descriptions;
YouTube players load lazily without autoplay. `sourceUrl` is optional.

Project case studies are stored in `src/app/work/projects/*.mdx`.
