import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Халим",
  lastName: "Раимжанов",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Fullstack-программист",
  avatar: "/images/avatar.jpg",
  location: "Asia/Bishkek", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Англисче", "Кыргызча", "Орусча", "Өзбекче", "Тажикче", "Түркчө"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Каттарга жазылуу · {person.firstName}</>,
  description: (
    <>
      Программалоо, архитектура жана технологиялар тууралуу жазуулар.
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
    name: "Электрондук почта",
    icon: "email",
    link: "mailto:halimjonraimjanov@gmail.com",
  },
];

const home = {
  label: "Башкы бет",
  title: `Портфолио · ${person.name}`,
  description: `Технологиялар тууралуу долбоорлор, макалалар жана видеолор. ${person.name}, ${person.role}.`,
  headline: <>Fullstack-программист жана команда жетекчиси</>,
  subline: (
    <>
      Мен Халиммин, программалоо командасын жетектейм: <InlineCode>MBulak</InlineCode>.
      Финансылык программаларды түзөм, кодду текшерем жана команданы пландоодон продукт чыгарууга чейин жетектейм.
    </>
  ),
};

const about = {
  label: "Мен жөнүндө",
  title: "Мен жөнүндө",
  description: `${person.name}: программалоо, команданы жетектөө, билим жана техникалык көндүмдөр.`,
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
    title: "Таанышуу",
    description: (
      <>
        MBulak компаниясында финансылык кызматтарды, сервердик системаларды жана маалымат базаларын иштеп чыгууну жетектейм. Ишенимдүү жана тейлөөгө ыңгайлуу продукттарды түзүү үчүн техникалык пландоо, кодду текшерүү жана команданы өнүктүрүү менен алектенем.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Иш тажрыйбасы",
    experiences: [
      {
        company: "MBulak",
        timeframe: "сентябрь 2024 - азыркы учур",
        role: "Команда жетекчиси",
        achievements: [
          <>Финансылык программаларды иштеп чыгууну жетектейм жана команданын ишин пландайм.</>,
          <>Кодду текшерип, архитектураны, өндүрүмдүүлүктү жана тейлөө ыңгайлуулугун баалайм.</>,
          <>Jira аркылуу спринттерди, артыкчылыктарды жана тапшырмаларды координациялайм.</>,
          <>Программисттерге жардам берип, иш процесстерин жакшыртам.</>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/cover.png",
            alt: "MBulak сайты",
            width: 18,
            height: 9,
          },
        ],
      },
      {
        company: "MBulak",
        timeframe: "сентябрь 2023 - сентябрь 2024",
        role: "Улук программист",
        achievements: [
          <>Финансылык продукттар үчүн сервердик кызматтарды жана SQL-процедураларды иштеп чыккам.</>,
          <>Python аркылуу Түндүк жана тышкы кызматтар менен интеграция жасагам.</>,
          <>Маалымат базасынын сурамдарын жана сервердик архитектураны оптималдаштыргам.</>,
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
        timeframe: "сентябрь 2022 - сентябрь 2023",
        role: "Программист",
        achievements: [
          <>Финансылык эсептөөлөр жана отчёттор үчүн SQL-процедураларды түзгөм.</>,
          <>Python аркылуу финансылык жана мамлекеттик кызматтар менен интеграцияларды иштеп чыккам.</>,
          <>Сурамдарды оптималдаштырып, сервердик иштеп чыгууга катышкам.</>,
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
        timeframe: "июль 2021 - сентябрь 2022",
        role: "Кенже программист",
        achievements: [
          <>Транзакциялар жана отчёттор үчүн SQL-процедураларды иштеп чыккам.</>,
          <>Python интеграцияларын колдоп, API иштеп чыккам.</>,
          <>Каталарды изилдеп, сервердик бөлүктү жакшырткам.</>,
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
          <>Сервердик иштеп чыгууга жана финансылык маалыматтарды иштетүүгө жардам бергем.</>,
          <>Насаатчынын жетекчилиги менен SQL-сурамдарды жана сакталган процедураларды жазгам.</>,
          <>Коддун каталарын оңдоону жана аны тейлөөнү үйрөнгөм.</>,
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
        timeframe: "апрель 2020 - март 2021",
        role: "Колл-борбордун улук оператору",
        achievements: [
          <>Операторлордун ишин координациялап, жаңы кызматкерлерди окуткам.</>,
          <>Кардарлардын татаал кайрылууларын чечкем.</>,
          <>Сүйлөшүү сценарийлерин жана тейлөө процесстерин жакшырткам.</>,
        ],
        images: [
          {
            src: "/images/callcenter.png",
            alt: "Колл-борбор",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "MBulak",
        timeframe: "сентябрь 2018 - апрель 2020",
        role: "Колл-борбордун оператору",
        achievements: [
          <>Кардарларга финансылык кызматтар жана кредитке арыз берүү боюнча кеңеш бергем.</>,
          <>Кайрылууларды иштетип, кардарлар тууралуу маалыматтарды жүргүзгөм.</>,
          <>Суроолорго жооп берип, талаштуу жагдайларды чечкем.</>,
        ],
        images: [
          {
            src: "/images/callcenter.png",
            alt: "Колл-борбор",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "S Parfum",
        timeframe: "август 2017 - сентябрь 2018",
        role: "Сатуучу-кеңешчи",
        achievements: [
          <>Сатып алуучуларга атыр тандоого жардам берип, сатууларды коштогом.</>,
          <>Витриналарды жасалгалап, товарлардын көрсөтүлүшүнө көз салгам.</>,
          <>Кардарлар менен мамиле түзүп, кайра сатып алууларга көмөктөшкөм.</>,
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
    title: "Билим",
    institutions: [
      {
        name: "Кыргыз-Россия Славян университети",
        description: (
          <>
            <b>Магистратура</b> программалык долбоорлорду башкаруу боюнча
            <br />
            <b>Орточо балл:</b> 4.7 / 5,
            <br />
            <b>Окуу мезгили:</b> 2020–2022
          </>
        ),
      },
      {
        name: "Кыргыз-Россия Славян университети",
        description: (
          <>
            <b>Бакалавриат</b> электроника жана наноэлектроника боюнча
            <br />
            <b>Орточо балл:</b> 4.95 / 5
            <br />
            <b>Окуу мезгили:</b> 2016–2020
          </>
        ),
      },
    ],
  },
  courses: {
    display: true, // set to false to hide this section
    title: "Сертификаттар",
    course: [{
        name: "Маалымат базаларынын администратору (DBA)",
        description: (
          <>
            Маалымат базаларын башкаруу боюнча окуп, сертификациялык экзамен тапшыргам.
            <br />
            <b>Мезгили:</b> апрель 2025 – май 2025.
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
        name: "Python программисти",
        description: (
          <>
            Python программалоосу боюнча 48 сааттык курсту бүтүргөм.
            <br />
            <b>Окуу мезгили:</b> март 2023 – апрель 2023.
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
        name: "Angular негиздери",
        description: (
          <>
            Angular негиздери боюнча окуудан өткөм.
            <br />
            <b>Окуу мезгили:</b> май 2023 – июнь 2023.
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
        name: "Vue.js менен программалоо",
        description: (
          <>
            Vue.js менен тиркемелерди иштеп чыгуу боюнча окуудан өткөм.
            <br />
            <b>Окуу мезгили:</b> июль 2023 – август 2023.
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
        name: "React менен программалоо",
        description: (
          <>
            React менен тиркемелерди иштеп чыгуу боюнча окуудан өткөм.
            <br />
            <b>Окуу мезгили:</b> сентябрь 2023 – октябрь 2023.
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
    title: "Техникалык көндүмдөр",
    skills: [
      {
        title: "Figma",
        description: <>Интерфейс дизайны жана прототип түзүү.</>,
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
        description: <>SQL-сурамдар, сакталган процедуралар жана маалымат базаларын оптималдаштыруу.</>,
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
        description: <>Сервердик программалоо, автоматташтыруу жана кызматтарды интеграциялоо.</>,
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
        description: <>Адаптивдүү түзүм жана интерфейс компоненттери.</>,
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
        description: <>Адаптивдүү жасалгалоо жана барак түзүмү.</>,
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
        description: <>Интерактивдүү интерфейстер жана тиркемелердин логикасы.</>,
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
        description: <>Барактардын семантикалык түзүмү.</>,
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
        description: <>Кайра колдонулуучу стилдер жана CSS уюштуруу.</>,
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
        description: <>JavaScript менен сервердик программалоо.</>,
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
        description: <>Версияларды көзөмөлдөө жана биргелешип иштеп чыгуу.</>,
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
        description: <>Репозиторийлерди башкаруу жана кодду текшерүү.</>,
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
        description: <>Спринттерди пландоо жана тапшырмаларды башкаруу.</>,
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
        description: <>Сүрөттөрдү түзөтүү жана графика түзүү.</>,
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
        description: <>Компоненттерге негизделген колдонуучу интерфейстери.</>,
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
        description: <>Командадагы байланыш жана координация.</>,
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
  title: "Технологиялар тууралуу жөнөкөй тил менен",
  description: `Программалоо, санариптик купуялык жана технологиялар тууралуу макалалар менен видеолор. Автор — ${person.name}.`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Долбоорлор",
  title: "Менин долбоорлорум",
  description: `Тандалган сайттар жана программалык долбоорлор. Автор — ${person.name}.`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Галерея",
  title: "Сүрөт галереясы",
  description: `Жеке сүрөттөр: ${person.name}.`,
  images: [
    {
      src: "/images/gallery/lake-portrait.webp",
      alt: "Халим көлдө кайыкта",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/interior-portrait.webp",
      alt: "Халим мрамор атриумда",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/event-portrait.webp",
      alt: "Халим MBulak иш-чарасында",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/suit-portrait.webp",
      alt: "Халим ак унаанын жанында кара костюмчан",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/portrait-portrait.webp",
      alt: "Халимдин кара фондогу портрети",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-01.jpg",
      alt: "Жеке сүрөт 06",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "Жеке сүрөт 07",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "Жеке сүрөт 08",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "Жеке сүрөт 09",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "Жеке сүрөт 10",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "Жеке сүрөт 11",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "Жеке сүрөт 12",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "Жеке сүрөт 13",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "Жеке сүрөт 14",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "Жеке сүрөт 15",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "Жеке сүрөт 16",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "Жеке сүрөт 17",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "Жеке сүрөт 18",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
