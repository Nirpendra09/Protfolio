// ExperienceCardHeader.tsx
import { Briefcase } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ExperienceCardHeaderProps {
  role: string;
  company: string;
  duration: string;
  location?: string;
  className?: string;
}

export const ExperienceCardHeader = ({
  role,
  company,
  duration,
  location,
  className,
}: ExperienceCardHeaderProps) => {
  return (
    <div className={twMerge("flex flex-col p-6 md:py-8 md:px-9", className)}>
      <div className="inline-flex items-center gap-4">
        <div className="flex items-center justify-center size-12 rounded-xl bg-gradient-to-r from-emerald-300 to-sky-400">
          <Briefcase className="size-6 text-gray-950" />
        </div>
        <div>
          <h3 className="font-serif text-2xl text-white">{role}</h3>
          <p className="bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text font-medium">
            {company}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-white/60 mt-3 text-xs md:text-sm lg:text-base">
        <span>{duration}</span>
        {location && (
          <>
            <span className="text-white/30">•</span>
            <span>{location}</span>
          </>
        )}
      </div>
    </div>
  );
};
