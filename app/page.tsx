import { About } from "@/components/main/about";
import { Contact } from "@/components/main/contact";
import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { ProjectsSection } from "@/components/main/ProjectsSection";
import { Skills } from "@/components/main/skills";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <About />
        <Skills />
        <Encryption />
        <ProjectsSection />
        <Contact />
      </div>
    </main>
  );
}
