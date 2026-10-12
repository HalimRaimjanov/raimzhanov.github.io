import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Khalim",
  lastName: "Raimzhanov",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Full Stack Developer",
  avatar: "/images/avatar.jpg",
  location: "Asia/Bishkek", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Kyrgyz", "Russian", "Uzbek", "Tajik", "Turkish"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      Occasional notes on software development, architecture and technology.
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
    name: "Email",
    icon: "email",
    link: "mailto:halimjonraimjanov@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Software projects, technical articles and videos by ${person.name}, ${person.role}.`,
  headline: <>Full Stack Developer & Team Lead</>,
  subline: (
    <>
      I'm Khalim, a Team Lead at <InlineCode>MBulak</InlineCode>.
      I build financial software, review code and guide teams from planning to delivery.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `${person.name}: software engineering, team leadership, education and technical skills.`,
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
    title: "Introduction",
    description: (
      <>
        I lead software development at MBulak, with a focus on financial services,
        backend systems and databases. My work combines technical planning,
        code reviews and team development to deliver reliable, maintainable software.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "MBulak",
        timeframe: "Sep 2024 - Present",
        role: "Team Lead",
        achievements: [
          <>Lead development of financial software and plan delivery with the engineering team.</>,
          <>Review code and assess architecture, performance and maintainability.</>,
          <>Coordinate sprints, priorities and issue tracking in Jira.</>,
          <>Support engineers and improve development workflows.</>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/cover.png",
            alt: "Mbulak Website",
            width: 18,
            height: 9,
          },
        ],
      },
      {
        company: "MBulak",
        timeframe: "Sep 2023 - Sep 2024",
        role: "Senior Software Engineer",
        achievements: [
          <>Developed backend services and SQL procedures for financial products.</>,
          <>Integrated Tunduk and external services using Python.</>,
          <>Optimized database queries and backend architecture.</>,
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
        timeframe: "Sep 2022 - Sep 2023",
        role: "Middle Software Engineer",
        achievements: [
          <>Built SQL procedures for financial calculations and reporting.</>,
          <>Developed Python integrations with financial and government services.</>,
          <>Optimized queries and collaborated on backend development.</>,
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
        timeframe: "July 2021 - Sep 2022",
        role: "Junior Software Engineer",
        achievements: [
          <>Developed SQL procedures for transactions and reporting.</>,
          <>Supported Python integrations and API development.</>,
          <>Investigated defects and contributed to backend improvements.</>,
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
        timeframe: "Mar 2021 - July 2021",
        role: "Intern",
        achievements: [
          <>Supported backend development and financial data processing.</>,
          <>Wrote SQL queries and stored procedures under supervision.</>,
          <>Practised debugging and code maintenance.</>,
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
        timeframe: "Apr 2020 - Mar 2021",
        role: "Senior Call Center Operator",
        achievements: [
          <>Supervised call centre operators and trained new staff.</>,
          <>Resolved escalated customer requests.</>,
          <>Improved call scripts and service workflows.</>,
        ],
        images: [
          {
            src: "/images/callcenter.png",
            alt: "Callcenter",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "MBulak",
        timeframe: "Sep 2018 - Apr 2020",
        role: "Call Center Operator",
        achievements: [
          <>Assisted customers with financial services and loan applications.</>,
          <>Processed requests and maintained customer records.</>,
          <>Resolved enquiries and customer disputes.</>,
        ],
        images: [
          {
            src: "/images/callcenter.png",
            alt: "Callcenter",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "S Parfum",
        timeframe: "Aug 2017 - Sep 2018",
        role: "Sales Associate",
        achievements: [
          <>Advised customers on fragrances and supported sales.</>,
          <>Maintained product displays and store presentation.</>,
          <>Built customer relationships and encouraged repeat purchases.</>,
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
    title: "Education",
    institutions: [
      {
        name: "Kyrgyz-Russian Slavic University",
        description: (
          <>
            <b>Master's degree</b> in Software Project Management
            <br />
            <b>GPA:</b> 4.7 / 5,
            <br />
            <b>Study Period:</b> 2020–2022
          </>
        ),
      },
      {
        name: "Kyrgyz-Russian Slavic University",
        description: (
          <>
            <b>Bachelor's degree</b> in Electronics and Nanoelectronics
            <br />
            <b>GPA:</b> 4.95 / 5
            <br />
            <b>Study Period:</b> 2016–2020
          </>
        ),
      },
    ],
  },
  courses: {
    display: true, // set to false to hide this section
    title: "Certificates",
    course: [{
        name: "Database Administrator (DBA)",
        description: (
          <>
            Completed database administration training and passed the certification assessment.
            <br />
            <b>Period:</b> April 2025 – May 2025.
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
        name: "Python Developer",
        description: (
          <>
            Completed a 48-hour course in Python development.
            <br />
            <b>Study Period:</b> March 2023 – April 2023.
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
        name: "Basics of Angular",
        description: (
          <>
            Completed training in Angular fundamentals.
            <br />
            <b>Study Period:</b> May 2023 – June 2023.
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
        name: "Vue.js Development",
        description: (
          <>
            Completed training in Vue.js application development.
            <br />
            <b>Study Period:</b> July 2023 – August 2023.
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
        name: "React Development",
        description: (
          <>
            Completed training in React application development.
            <br />
            <b>Study Period:</b> Sep 2023 – Oct 2023.
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
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Interface design and prototyping.</>,
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
        description: <>SQL queries, stored procedures and database optimization.</>,
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
        description: <>Backend development, automation and service integrations.</>,
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
        description: <>Responsive layouts and interface components.</>,
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
        description: <>Responsive styling and layout.</>,
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
        description: <>Interactive interfaces and application logic.</>,
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
        description: <>Semantic page structure.</>,
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
        description: <>Reusable styles and CSS organization.</>,
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
        description: <>Server-side JavaScript development.</>,
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
        description: <>Version control and collaborative development.</>,
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
        description: <>Repository management and code reviews.</>,
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
        description: <>Sprint planning and issue tracking.</>,
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
        description: <>Image editing and visual assets.</>,
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
        description: <>Component-based user interfaces.</>,
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
        description: <>Team communication and coordination.</>,
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
  label: "Blog",
  title: "Technology, explained",
  description: `Articles and videos on software development, digital privacy and technology by ${person.name}.`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Selected websites and software projects by ${person.name}.`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "Photo gallery",
  description: `A selection of personal photographs by ${person.name}.`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
