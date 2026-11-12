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

## Deployment to raimzhanov.me

The production site is hosted on Vercel. `vercel.json` configures the project as
Next.js with `npm ci` and `npm run build`. Do not publish the legacy `out` folder.

The owner has connected `HalimRaimjanov/raimzhanov.github.io` to Vercel.
The working checkout is `/Users/halimraimjanov/projects/GitHub/my-portfolio`.
Push changes from this checkout to the production branch `main`. Vercel builds
the commit and updates `raimzhanov.me` after a successful deployment. The Vercel
root directory should be the repository root. Check deployment logs in Vercel
if a push does not update the site.

```sh
git add src public/images/youtube package.json vercel.json README.md
git commit -m "Add YouTube channel cover and configure Vercel deployment"
git push origin main
```

The channel cover is `public/images/youtube/channel-cover.webp` (1600 × 900).
It was edited with built-in imagegen from the owner's portrait. Prompt: extend
the mountain landscape to a 16:9 cover, preserve the face, sunglasses, hairstyle
and clothing, use natural light, and add no text or logos. The play icon and
clickable link are rendered by the website.

## Мечты и админка

Раздел `/dreams`, защищённая админка `/admin/dreams`. Настройка хранилища и пароля: [DREAMS.md](DREAMS.md).

## Языки сайта

Переключатель сверху: RU / ENG / KG. Выбор сохраняется в cookie site_language на год; при первом посещении учитывается основной язык браузера (en или ky), иначе используется русский. Переключение сохраняет текущую страницу, параметры и якорь. Для кыргызского языка используется стандартный код ky, а в меню — KG.

Русские страницы находятся в src/app и src/components. Английские и кыргызские тексты, статьи и компоненты — в src/locales/en и src/locales/ky. Маршруты src/app/en и src/app/ky используют эти версии; middleware выбирает язык для обычных ссылок. При изменении содержимого обновляйте все три версии. Общие настройки подключения, API и данные мечты используются совместно.

В админке есть отдельные поля названия и описания для ENG и KG. Если перевод собственного текста не заполнен, показывается исходный русский текст; стандартное описание Lixiang уже переведено. Переводы не изменяют суммы и курс. Новых переменных Vercel не требуется.

## Материалы в Vercel

Перед `npm run build` и `npm run dev` автоматически запускается `scripts/generate-content.cjs`. Он собирает MDX-материалы всех языков в `src/generated/content.json`, который включается в серверную сборку. Исходные MDX-файлы не читаются во время обработки запросов. После изменения статьи пересоберите сайт. Генератор завершится с ошибкой, если отсутствуют обязательные поля материала.
