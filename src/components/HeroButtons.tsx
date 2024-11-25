"use client";

import { FC } from "react";
import ArrowDown from "@/assets/icons/arrow-down.svg";

// Define valid section IDs
type SectionId = "projects" | "contact";

interface HeroButtonsProps {
  className?: string;
}

interface ScrollConfig {
  behavior: ScrollBehavior;
}

export const HeroButtons: FC<HeroButtonsProps> = ({ className = "" }) => {
  const scrollToSection = (sectionId: SectionId): void => {
    console.log("scroll");
    const element = document.getElementById(sectionId);
    if (element) {
      const config: ScrollConfig = { behavior: "smooth" };
      element.scrollIntoView(config);
    } else {
      console.warn(`Element with id "${sectionId}" not found`);
    }
  };

  const handleButtonClick =
    (sectionId: SectionId) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      scrollToSection(sectionId);
    };

  return (
    <div
      className={`flex flex-col md:flex-row justify-center items-center mt-8 gap-4 z-10 ${className}`}
    >
      <button
        type="button"
        className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl"
        onClick={handleButtonClick("projects")}
        aria-label="Explore my work"
      >
        <span className="font-semibold">Explore My Work</span>
        <ArrowDown className="size-4" />
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl"
        onClick={handleButtonClick("contact")}
        aria-label="Let's connect"
      >
        <span role="img" aria-label="wave">
          👋
        </span>
        <span className="font-semibold">Let&apos;s Connect</span>
      </button>
    </div>
  );
};
