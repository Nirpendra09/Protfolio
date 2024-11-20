"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { ExperienceCardHeader } from "@/components/ExperienceCardHeader";

export const ExperienceSection = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const experiences = [
    {
      id: 1,
      role: "Software Engineer 1",
      company: "ALLEN Digital",
      duration: "Aug 2024 - Present",
      location: "Bangalore, Karnataka",
      description:
        "Working with content platform team to develop and enhance educational content delivery systems.",
      highlights: [
        "Developed interactive flashcard interface with Tinder-like swiping functionality",
        "Enhanced user engagement for content management team",
        "Engineered responsive UI components for educational content delivery",
        "Focused on intuitive card-based navigation and concept presentation",
      ],
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 2,
      role: "Software Development Engineer 1",
      company: "SPUR.FIT",
      duration: "Jun 2023 - Aug 2024",
      location: "Bangalore, Karnataka",
      description:
        "Full-stack development role focusing on performance optimization and feature integration.",
      highlights: [
        "Improved React app performance, raising lighthouse score from 21 to 59",
        "Boosted user engagement by 30%",
        "Re-architected key modules reducing load times by 20%",
        "Integrated wearable devices for real-time health data synchronization",
      ],
      skills: ["React", "React Native", "Node.js", "Express", "Prisma"],
    },
    {
      id: 3,
      role: "Software Engineering Intern",
      company: "PlaySimple Games",
      duration: "Dec 2022 - Jun 2023",
      location: "Bangalore, Karnataka",
      description:
        "Worked with the Monetization Team on mobile game ad integration and optimization.",
      highlights: [
        "Collaborated on ad monetization features in mobile games",
        "Integrated audio ads with non-intrusive user experience",
        "Increased ad revenue through strategic implementation",
        "Optimized ad placements for better user engagement",
      ],
      skills: ["Mobile Development", "Ad Integration", "Optimization"],
    },
  ];

  return (
    <div id="experience" className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="Professional Journey"
          title="Work Experience"
          description="A timeline of my professional growth and achievements in software development."
        />

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  className="group relative overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                  onClick={() =>
                    setSelectedId(selectedId === exp.id ? null : exp.id)
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/5 to-sky-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <ExperienceCardHeader
                    role={exp.role}
                    company={exp.company}
                    duration={exp.duration}
                    location={exp.location}
                  />

                  <div className="px-8 pb-8">
                    <div className="h-px w-full bg-gradient-to-r from-emerald-300/20 via-sky-400/20 to-transparent" />

                    <p className="mt-6 text-white/70 leading-relaxed">
                      {exp.description}
                    </p>

                    <button className="mt-6 group/btn inline-flex items-center gap-2.5">
                      <span className="relative flex items-center justify-center size-6 rounded-full">
                        <span className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full opacity-20 group-hover/btn:opacity-40 transition-opacity" />
                        <Star className="size-4 text-emerald-300 group-hover/btn:text-emerald-200 transition-colors" />
                      </span>
                      <span className="font-medium bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
                        {selectedId === exp.id ? "Hide" : "View"} Achievements
                      </span>
                    </button>

                    <AnimatePresence>
                      {selectedId === exp.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 space-y-4 overflow-hidden"
                        >
                          {exp.highlights.map((highlight, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 text-white/80"
                            >
                              <span className="relative flex h-2 w-2 mt-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                              </span>
                              <span className="leading-relaxed">
                                {highlight}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {exp.skills.map((skill, index) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative px-4 py-1.5 text-sm font-medium"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-emerald-300/10 to-sky-400/10 rounded-full border border-emerald-400/20" />
                          <span className="relative text-white/90">
                            {skill}
                          </span>
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
