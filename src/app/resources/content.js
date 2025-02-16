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
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about programming, technology, and share thoughts on
      the intersection of code, architecture, and problem-solving.
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
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Full stack Developer</>,
  subline: (
    <>
      I'm Khalim, a Team Lead at <InlineCode>Mbulak</InlineCode>, where I
      oversee code reviews,
      <br />
      develop projects related to banking services, and conduct technical
      assessments.
      <br />I ensure high-quality software development, optimize processes,
      <br />
      and guide my team in delivering efficient and scalable solutions.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
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
        Khalim is a results-driven Team Lead at Mbulak with over seven years of
        experience in fintech and backend development. He specializes in
        building scalable financial solutions, optimizing development processes,
        and leading high-performing teams. His expertise spans project strategy,
        technical evaluation, and fostering effective communication to drive
        success. Passionate about guiding projects from concept to completion,
        Khalim thrives on collaboration and problem-solving. With a strong
        foundation in software product management, he is dedicated to creating
        impactful and efficient technology solutions in the financial sector.
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
          <>
            Lead the development of fintech solutions, optimizing banking
            services and improving transaction processing speeds.
          </>,
          <>
            Conduct detailed code reviews, enhancing code quality and reducing
            critical bugs.
          </>,
          <>
            Implement optimized development workflows, increasing team
            efficiency and reducing project delivery time.
          </>,
          <>
            Conduct technical assessments for new projects, ensuring scalability
            and performance optimization.
          </>,
          <>
            Foster a collaborative engineering culture, improving cross-team
            communication and productivity.
          </>,
          <>
            Work with Jira for project tracking, sprint planning, and issue
            management.
          </>,
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
        company: "Mbulak",
        timeframe: "Sep 2023 - Sep 2024",
        role: "Senior Software Engineer",
        achievements: [
          <>
            Developed and implemented key backend solutions for the company’s
            financial products.
          </>,
          <>
            Optimized database and server processes, improving request
            processing speeds.
          </>,
          <>
            Worked on integrating Tunduk services to streamline and accelerate
            the financing process for clients.
          </>,
          <>
            Led the development of high-performance backend solutions for
            financial services.
          </>,
          <>
            Created and maintained advanced SQL procedures for critical
            financial operations.
          </>,
          <>
            Integrated external services via Python, enhancing automation and
            data flow.
          </>,
          <>Improved system scalability and optimized backend architecture.</>,
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
        company: "Mbulak",
        timeframe: "Sep 2022 - Sep 2023",
        role: "Middle Software Engineer",
        achievements: [
          <>
            Designed and implemented complex SQL procedures for financial
            calculations and analytics.
          </>,
          <>
            Developed Python-based integrations with external financial and
            government services.
          </>,
          <>
            Optimized database queries to improve system performance and reduce
            processing time.
          </>,
          <>
            Worked closely with cross-functional teams to develop scalable
            fintech solutions.
          </>,
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
        company: "Mbulak",
        timeframe: "July 2021 - Sep 2022",
        role: "Junior Software Engineer",
        achievements: [
          <>
            Developed and optimized SQL procedures for financial transactions
            and reporting.
          </>,
          <>
            Assisted in integrating third-party services using Python for
            automation and data exchange.
          </>,
          <>
            Collaborated with senior developers on backend architecture
            improvements.
          </>,
          <>Gained experience in API development and system debugging.</>,
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
        company: "Mbulak",
        timeframe: "Mar 2021 - July 2021",
        role: "Intern",
        achievements: [
          <>
            Gained foundational experience in software development, focusing on
            backend technologies.
          </>,
          <>
            Assisted in writing SQL queries and stored procedures for financial
            data processing.
          </>,
          <>
            Learned and applied best practices in coding, debugging, and
            software optimization.
          </>,
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
        company: "Mbulak",
        timeframe: "Apr 2020 - Mar 2021",
        role: "Senior Call Center Operator",
        achievements: [
          <>
            Supervised a team of operators, ensuring high-quality customer
            service and adherence to company policies.
          </>,
          <>
            Trained new employees, enhancing team performance and knowledge
            retention.
          </>,
          <>
            Handled escalated customer issues, improving resolution efficiency.
          </>,
          <>
            Assisted in optimizing call scripts and workflow processes to
            increase call efficiency.
          </>,
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
        company: "Mbulak",
        timeframe: "Sep 2018 - Apr 2020",
        role: "Call Center Operator",
        achievements: [
          <>
            Provided customer support, assisting clients with financial services
            and loan applications.
          </>,
          <>
            Processed customer requests efficiently, improving service response
            times.
          </>,
          <>
            Developed strong communication and problem-solving skills, handling
            complex client inquiries.
          </>,
          <>
            Maintained accurate customer records and assisted in resolving
            disputes.
          </>,
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
          <>
            Advised customers on fragrances, providing personalized
            recommendations based on their preferences.
          </>,
          <>
            Met and exceeded monthly sales targets, contributing to overall
            store revenue.
          </>,
          <>
            Maintained product displays and ensured a high standard of store
            presentation.
          </>,
          <>
            Built strong customer relationships, enhancing brand loyalty and
            repeat purchases.
          </>,
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
    title: "Studies",
    institutions: [
      {
        name: "Kyrgyz-Russian Slavic University",
        description: (
          <>
            <b>Master</b> of Science in Software Project Management
            <br />
            <b>GPA:</b> 4.7 / 5,
            <br />
            <b>Study Period:</b> 2020 – 2022.
          </>
        ),
      },
      {
        name: "Kyrgyz-Russian Slavic University",
        description: (
          <>
            <b>Bachelor</b> of Science in Electronics and Nanoelectronics
            <br />
            <b>GPA:</b> 4.95 /5
            <br />
            <b>Study Period:</b> 2016 – 2020.
          </>
        ),
      },
    ],
  },
  courses: {
    display: true, // set to false to hide this section
    title: "Courses",
    course: [
      {
        name: "Python Developer",
        description: (
          <>
            Completed a professional Python Developer course lasting 48 hours.
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
            Completed a professional Python Developer course lasting 48 hours.
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
        name: "Comprehensive Vue.js Study",
        description: (
          <>
            Completed a professional Python Developer course lasting 48 hours.
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
        name: "Comprehensive React.js Study",
        description: (
          <>
            Completed a professional Python Developer course lasting 48 hours.
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
        description: <></>,
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
        title: "MYSQL",
        description: <></>,
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
        description: <></>,
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
        description: <></>,
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
        description: <></>,
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
        title: "JS",
        description: <></>,
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
        description: <></>,
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
        title: "LESS",
        description: <></>,
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
        title: "NodeJs",
        description: <></>,
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
        title: "Python",
        description: <></>,
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
        title: "Git",
        description: <></>,
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
        title: "Github",
        description: <></>,
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
        description: <></>,
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
        title: "PS",
        description: <></>,
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
        description: <></>,
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
        description: <></>,
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
  title: "Writing about developing and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
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
      src: "/images/gallery/img-09.jpg",
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
