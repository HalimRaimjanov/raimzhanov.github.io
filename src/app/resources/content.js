import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Халим",
  lastName: "Раимжанов",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Fullstack-разработчик",
  avatar: "/images/avatar.jpg",
  location: "Asia/Bishkek", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Английский", "Кыргызский", "Русский", "Узбекский", "Таджикский", "Турецкий"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Подписаться на рассылку · {person.firstName}</>,
  description: (
    <>
      Заметки о разработке, архитектуре и технологиях.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/HalimRaimjanov",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/halimraimjanov/",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/halim_raimjanov?igsh=MTVoOWZydmxpazN5cA%3D%3D&utm_source=qr",
  },
  {
    name: "Почта",
    icon: "email",
    link: "mailto:halimjonraimjanov@gmail.com",
  },
];

const home = {
  label: "Главная",
  title: `Портфолио · ${person.name}`,
  description: `Проекты, статьи и видео о технологиях. ${person.name}, ${person.role}.`,
  headline: <>Fullstack-разработчик и руководитель команды</>,
  subline: (
    <>
      Я Халим, руковожу командой разработки в <InlineCode>MBulak</InlineCode>.
      Создаю финансовое ПО, проверяю код и веду команду от планирования до выпуска продукта.
    </>
  ),
};

const about = {
  label: "Обо мне",
  title: "Обо мне",
  description: `${person.name}: разработка ПО, руководство командой, образование и технические навыки.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "mailto:halimjonraimjanov@gmail.com",
  },
  intro: {
    display: true,
    title: "Знакомство",
    description: (
      <>
        Руковожу разработкой ПО в MBulak: финансовыми сервисами, серверными системами
        и базами данных. Занимаюсь техническим планированием, проверкой кода
        и развитием команды, чтобы создавать надёжные и удобные в поддержке продукты.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Опыт работы",
    experiences: [
      {
        company: "MBulak",
        timeframe: "сент. 2024 - настоящее время",
        role: "Руководитель команды",
        achievements: [
          <>Руковожу разработкой финансового ПО и планирую работу команды.</>,
          <>Проверяю код, оцениваю архитектуру, производительность и удобство поддержки.</>,
          <>Координирую спринты, приоритеты и задачи в Jira.</>,
          <>Помогаю разработчикам и совершенствую рабочие процессы.</>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/cover.png",
            alt: "Сайт MBulak",
            width: 18,
            height: 9,
          },
        ],
      },
      {
        company: "MBulak",
        timeframe: "сент. 2023 - сент. 2024",
        role: "Старший разработчик",
        achievements: [
          <>Разрабатывал серверные сервисы и SQL-процедуры для финансовых продуктов.</>,
          <>Интегрировал Тундук и внешние сервисы с помощью Python.</>,
          <>Оптимизировал запросы к базе данных и серверную архитектуру.</>,
        ],
        images: [
          {
            src: "/images/mbulak.png",
            alt: "Mbulak",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "MBulak",
        timeframe: "сент. 2022 - сент. 2023",
        role: "Разработчик",
        achievements: [
          <>Создавал SQL-процедуры для финансовых расчётов и отчётности.</>,
          <>Разрабатывал интеграции с финансовыми и государственными сервисами на Python.</>,
          <>Оптимизировал запросы и участвовал в серверной разработке.</>,
        ],
        images: [
          {
            src: "/images/mbulak.png",
            alt: "Mbulak",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "MBulak",
        timeframe: "июль 2021 - сент. 2022",
        role: "Младший разработчик",
        achievements: [
          <>Разрабатывал SQL-процедуры для транзакций и отчётности.</>,
          <>Поддерживал интеграции на Python и разрабатывал API.</>,
          <>Разбирался с ошибками и улучшал серверную часть.</>,
        ],
        images: [
          {
            src: "/images/mbulak.png",
            alt: "Mbulak",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "MBulak",
        timeframe: "март 2021 - июль 2021",
        role: "Стажёр",
        achievements: [
          <>Помогал в серверной разработке и обработке финансовых данных.</>,
          <>Писал SQL-запросы и хранимые процедуры под руководством наставника.</>,
          <>Учился отладке и сопровождению кода.</>,
        ],
        images: [
          {
            src: "/images/mbulak.png",
            alt: "Mbulak",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "MBulak",
        timeframe: "апр. 2020 - март 2021",
        role: "Старший оператор колл-центра",
        achievements: [
          <>Координировал работу операторов и обучал новых сотрудников.</>,
          <>Решал сложные обращения клиентов.</>,
          <>Улучшал сценарии разговоров и процессы обслуживания.</>,
        ],
        images: [
          {
            src: "/images/callcenter.png",
            alt: "Колл-центр",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "MBulak",
        timeframe: "сент. 2018 - апр. 2020",
        role: "Оператор колл-центра",
        achievements: [
          <>Консультировал клиентов по финансовым услугам и заявкам на кредит.</>,
          <>Обрабатывал обращения и вёл клиентские записи.</>,
          <>Отвечал на вопросы и разрешал спорные ситуации.</>,
        ],
        images: [
          {
            src: "/images/callcenter.png",
            alt: "Колл-центр",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "S Parfum",
        timeframe: "авг. 2017 - сент. 2018",
        role: "Продавец-консультант",
        achievements: [
          <>Помогал покупателям выбирать ароматы и сопровождал продажи.</>,
          <>Оформлял витрины и следил за презентацией товаров.</>,
          <>Выстраивал отношения с клиентами и помогал им возвращаться за покупками.</>,
        ],
        images: [
          {
            src: "/images/sparfum-1.png",
            alt: "S Parfum",
            width: 16,
            height: 9,
          },
          {
            src: "/images/sparfum-2.png",
            alt: "S Parfum",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Образование",
    institutions: [
      {
        name: "Кыргызско-Российский Славянский университет",
        description: (
          <>
            <b>Магистратура</b> по управлению программными проектами
            <br />
            <b>Средний балл:</b> 4.7 / 5,
            <br />
            <b>Период обучения:</b> 2020–2022
          </>
        ),
      },
      {
        name: "Кыргызско-Российский Славянский университет",
        description: (
          <>
            <b>Бакалавриат</b> по электронике и наноэлектронике
            <br />
            <b>Средний балл:</b> 4.95 / 5
            <br />
            <b>Период обучения:</b> 2016–2020
          </>
        ),
      },
    ],
  },
  courses: {
    display: true, // set to false to hide this section
    title: "Сертификаты",
    course: [{
        name: "Администратор баз данных (DBA)",
        description: (
          <>
            Прошёл обучение администрированию баз данных и сдал сертификационный экзамен.
            <br />
            <b>Период:</b> апрель 2025 – май 2025.
          </>
        ),
        images: [{
          src: "/images/courses/DB_admin.jpg",
          alt: "DBA",
          width: 16,
          height: 9,
        },],
      },
      {
        name: "Разработчик Python",
        description: (
          <>
            Прошёл 48-часовой курс разработки на Python.
            <br />
            <b>Период обучения:</b> март 2023 – апрель 2023.
          </>
        ),
        images: [{
          src: "/images/courses/python-dev.png",
          alt: "Python",
          width: 16,
          height: 9,
        },],
      },
      {
        name: "Основы Angular",
        description: (
          <>
            Прошёл обучение основам Angular.
            <br />
            <b>Период обучения:</b> май 2023 – июнь 2023.
          </>
        ),
        images: [{
          src: "/images/courses/angular-dev.png",
          alt: "Angular",
          width: 16,
          height: 9,
        },],
      },
      {
        name: "Разработка на Vue.js",
        description: (
          <>
            Прошёл обучение разработке приложений на Vue.js.
            <br />
            <b>Период обучения:</b> июль 2023 – август 2023.
          </>
        ),
        images: [
          {
            src: "/images/courses/vuejs-dev.png",
            alt: "VueJs",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        name: "Разработка на React",
        description: (
          <>
            Прошёл обучение разработке приложений на React.
            <br />
            <b>Период обучения:</b> сент. 2023 – окт. 2023.
          </>
        ),
        images: [{
          src: "/images/courses/reactjs-dev.png",
          alt: "ReactJs",
          width: 16,
          height: 9,
        },],
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Технические навыки",
    skills: [
      {
        title: "Figma",
        description: <>Дизайн интерфейсов и прототипирование.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/figma.png",
            alt: "Figma",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "MySQL",
        description: <>SQL-запросы, хранимые процедуры и оптимизация баз данных.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/mysql.png",
            alt: "MYSQL",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "Python",
        description: <>Серверная разработка, автоматизация и интеграция сервисов.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/python.png",
            alt: "Python",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "Bootstrap",
        description: <>Адаптивная вёрстка и компоненты интерфейса.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/bootstrap.png",
            alt: "Bootstrap",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "CSS",
        description: <>Адаптивное оформление и вёрстка.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/css.png",
            alt: "Css",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "JavaScript",
        description: <>Интерактивные интерфейсы и логика приложений.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/js.png",
            alt: "JS",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "HTML",
        description: <>Семантическая структура страниц.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/html.png",
            alt: "HTML",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "Less",
        description: <>Переиспользуемые стили и организация CSS.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/less.png",
            alt: "Less",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "Node.js",
        description: <>Серверная разработка на JavaScript.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/nodejs.png",
            alt: "NodeJs",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "Git",
        description: <>Контроль версий и совместная разработка.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/git.png",
            alt: "Git",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "GitHub",
        description: <>Управление репозиториями и проверка кода.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/github.svg",
            alt: "Github",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "Jira",
        description: <>Планирование спринтов и управление задачами.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/Jira.png",
            alt: "Jira",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "Photoshop",
        description: <>Редактирование изображений и создание графики.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/ps.png",
            alt: "PS",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "React",
        description: <>Пользовательские интерфейсы на основе компонентов.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/react.png",
            alt: "React",
            width: 100,
            height: 100,
          },
        ],
      },
      {
        title: "Slack",
        description: <>Общение и координация команды.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/skills/slack.png",
            alt: "Slack",
            width: 100,
            height: 100,
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Блог",
  title: "О технологиях простыми словами",
  description: `Статьи и видео о разработке, цифровой приватности и технологиях. Автор — ${person.name}.`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Проекты",
  title: "Мои проекты",
  description: `Избранные сайты и программные проекты. Автор — ${person.name}.`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Галерея",
  title: "Фотогалерея",
  description: `Личные фотографии: ${person.name}.`,
  images: [
    {
      src: "/images/gallery/lake-portrait.webp",
      alt: "Халим в лодке на озере",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/interior-portrait.webp",
      alt: "Халим в мраморном атриуме",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/event-portrait.webp",
      alt: "Халим на мероприятии MBulak",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/suit-portrait.webp",
      alt: "Халим в чёрном костюме у белого автомобиля",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/portrait-portrait.webp",
      alt: "Портрет Халима на тёмном фоне",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-01.jpg",
      alt: "Личная фотография 06",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "Личная фотография 07",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "Личная фотография 08",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "Личная фотография 09",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "Личная фотография 10",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "Личная фотография 11",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "Личная фотография 12",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "Личная фотография 13",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "Личная фотография 14",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "Личная фотография 15",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "Личная фотография 16",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "Личная фотография 17",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "Личная фотография 18",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
