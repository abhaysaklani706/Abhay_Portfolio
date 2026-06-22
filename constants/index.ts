import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";


export const SOCIALS = [
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/abhaysaklani706",
  },
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/abhay-saklani-b23389217/",
  },
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://instagram.com/abhaysa1",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "/skills/html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "/skills/css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "/skills/js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "React.js",
    image: "/skills/react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Tailwind CSS",
    image: "/skills/tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Figma",
    image: "/skills/figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: ".NET Core",
    image: "/skills/dotnet.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "ASP.NET",
    image: "/skills/dotnet.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "/skills/node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "/skills/express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "SQL Server",
    image: "/skills/sqlserver.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Firebase",
    image: "/skills/firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "REST API",
    image: "/skills/api.svg",
    width: 70,
    height: 70,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "C#",
    image: "/skills/csharp.svg",
    width: 70,
    height: 70,
  },
  {
    skill_name: "SQL",
    image: "/skills/sql.png.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "DBMS",
    image: "/skills/DBMS.PNG",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Git",
    image: "/skills/git.svg",
    width: 70,
    height: 70,
  },
  {
    skill_name: "GitHub",
    image: "/skills/github.svg",
    width: 70,
    height: 70,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "VS Code",
    image: "/skills/vscode.svg",
    width: 60,
    height: 60,
  },
  {
    skill_name: "Vercel",
    image: "/skills/vercel.svg",
    width: 60,
    height: 60,
  },
  {
    skill_name: "Netlify",
    image: "/skills/netlify.svg",
    width: 60,
    height: 60,
  },
  {
    skill_name: "NPM",
    image: "/skills/npm.svg",
    width: 60,
    height: 60,
  },
] as const;


export const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Graphic Era Hill University",
    period: "2023-2025",
    cgpa: "7.6",
    location: "Dehradun",
  },
  {
    degree: "Bachelor of Science in Information Technology (BSC IT)",
    institution: "Graphic Era Hill University",
    period: "2020-2023",
    cgpa: "7.56",
    location: "Dehradun",
  },
] as const;

export const CERTIFICATIONS = [
  {
    title: "Principles of UI/UX Design",
    issuer: "Coursera",
    year: "2024",
  },
  {
    title: "Machine Learning",
    issuer: "SoloLearn",
    year: "2024",
  },
  {
    title: "Web Development and Designing",
    issuer: "OSICS",
    year: "2023",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
            {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/abhaysaklani706",
      },
      {
        name: "Discord",
        icon: RxDiscordLogo,
        link: "https://discord.com",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://instagram.com/abhaysa1",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://x.com/_sanidhyy",
      },
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/abhay-saklani-b23389217/",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Become Sponsor",
        icon: null,
        link: "https://youtube.com/@abhaysaklani29",
      },
      {
        name: "Learning about me",
        icon: null,
        link: "/ABHAY_SOFTWARE_DEVELOPER (1).pdf",
      },
      {
        name: "Contact Me",
        icon: null,
        link: "mailto:abhaysaklani706@gmail.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "Home",
    link: "#hero",
  },
  {
    title: "About",
    link: "#about",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Experience",
    link: "#encryption",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Contact",
    link: "#contact",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/abhaysaklani706/portfolio",
  resume: "/ABHAY_SOFTWARE_DEVELOPER (1).pdf",
};
