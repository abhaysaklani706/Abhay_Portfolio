import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Abhay Saklani | Full Stack Software Developer",
  description:
    "Portfolio of Abhay Saklani, a software developer building scalable full-stack applications with React.js, .NET Core, ASP.NET Core and SQL Server.",
  keywords: [
    "Abhay Saklani",
    "portfolio",
    "software developer",
    "full stack developer",
    "react",
    ".NET Core",
    "ASP.NET Core",
    "SQL Server",
    "REST API",
    "nextjs",
  ] as Array<string>,
  authors: {
    name: "Abhay Saklani",
    url: "https://github.com/abhaysaklani706",
  },
  openGraph: {
    title: "Abhay Saklani | Full Stack Software Developer",
    description:
      "Scalable full-stack applications with React.js, .NET Core and SQL Server.",
    type: "website",
  },
} as const;
