const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const root = path.resolve(__dirname, '..');
const catalog = {};
for (const locale of ['ru', 'en', 'ky']) {
  catalog[locale] = {};
  const base = locale === 'ru' ? 'src/app' : `src/locales/${locale}/app`;
  for (const section of ['blog/posts', 'work/projects']) {
    const dir = path.join(root, base, section);
    catalog[locale][section] = fs.readdirSync(dir).filter(name => name.endsWith('.mdx')).sort().map(name => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, name), 'utf8'));
      if (!data.title || !data.publishedAt) throw new Error(`Missing title or date in ${base}/${section}/${name}`);
      return { slug: name.slice(0, -4), metadata: {
        title: data.title, publishedAt: data.publishedAt, summary: data.summary || '',
        image: data.image || '', images: data.images || [], tag: data.tag || '',
        team: data.team || [], link: Array.isArray(data.link) ? data.link[0] || '' : data.link || '',
      }, content };
    });
  }
}
const output = path.join(root, 'src/generated/content.json');
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(catalog, null, 2) + '\n');
console.log('Bundled articles and projects for RU, ENG and KG.');
