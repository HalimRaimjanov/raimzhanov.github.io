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


## Блог и проекты через админку

После деплоя откройте `/admin/blog` или `/admin/work`. Пароль и Upstash — те же, что для мечты. При первом входе в базу автоматически добавляются прежние материалы: 3 статьи, 11 видео, 3 проекта, YouTube-канал, 18 фотографий и сохранённая мечта (всего 37 записей). Повторный перенос не перезаписывает изменения, скрытые записи и отметки удаления.

Вверху — форма, внизу — таблица всех материалов. Доступны редактирование, скрытие/показ и удаление. Данные сохраняются в `portfolio:content:v1`; удаление оставляет внутреннюю отметку, чтобы исходные файлы не возвращали запись после деплоя. Ссылки прежних статей и проектов, переводы, команда и галереи сохраняются.

Главная и блог используют одну ленту, включая видео, от новых к старым. Главная берёт первые две опубликованные записи. У прежних видео отсутствуют даты: сохранён прежний порядок, вместо выдуманной даты на сайте дата не отображается. Для сортировки они используют фиксированное время переноса каталога; дату можно уточнить в форме. При одинаковой дате новые записи идут выше. Скрытые и удалённые записи исключаются также из главной, прямых ссылок и sitemap.

Текст можно писать как обычный текст или Markdown; HTML и JavaScript не исполняются. Переводы ENG/KG необязательны, пустые поля используют русский текст. При недоступности базы скрытые материалы не восстанавливаются из файлов. Изменения видны после открытия/обновления страницы, без нового деплоя.

Проверки: `npm run build`, затем `node scripts/test-content.cjs`. Проверка использует временную базу в памяти, не реальные данные Upstash.


### Мечты, канал и галерея

`/admin/dreams` управляет несколькими мечтами: отдельные суммы, курс KGS/USD, фотография, QR и ссылка на поддержку. Прежняя запись `portfolio:dream` переносится без изменения суммы и QR в `portfolio:content:v1`; повторный вход не перезаписывает её. Старый API записи одной мечты возвращает 410: сохранение работает через общий редактор.

`/admin/work` включает прежний YouTube-канал, его обложку, описание, ссылку и видимость. `/admin/gallery` включает 18 прежних фотографий и позволяет добавлять новые (до 1 МБ), менять подписи и переводы, скрывать и удалять. Все разделы используют общий пароль. Скрытые/удалённые записи не возвращаются при повторном переносе.

В блоге все карточки имеют обложки. Для видео без своей обложки используется превью YouTube; если оно недоступно, показывается локальное резервное изображение.
