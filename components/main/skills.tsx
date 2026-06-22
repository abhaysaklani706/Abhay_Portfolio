import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";

import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
} from "@/constants";

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      <SkillText />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-8 max-w-6xl mx-auto px-4">
        {[...FRONTEND_SKILL, ...BACKEND_SKILL, ...FULLSTACK_SKILL, ...OTHER_SKILL].map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-gradient-to-b from-transparent via-purple-900/20 to-transparent">
        </div>
      </div>
    </section>
  );
};
