import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import githubProfile from "@/assets/images/githubProfile.png";
import cryptoverse from "@/assets/images/cryptoverse.png";
import yoom from "@/assets/images/yoom.png";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";

const portfolioProjects = [
  {
    title: "Yoom - Video Conferencing",
    results: [
      {
        title: "Built a Zoom clone with Next.js, Tailwind CSS, and shadcn/ui.",
      },
      {
        title:
          "Implemented video calls, screen sharing, audio controls, and recording.",
      },
      {
        title: "Added features like screen sharing, user pinning, and more.",
      },
    ],
    link: "https://yoom-drab.vercel.app",
    image: yoom,
  },
  {
    title: "Cryptoverse",
    results: [
      {
        title:
          "Developed using React.js and Ant Design. Integrated real-time cryptocurrency data via APIs.",
      },
      { title: "Created dynamic cryptocurrency statistic displays." },
      { title: "Included a crypto news section forthe latest updates." },
    ],
    link: "https://crytosverse.netlify.app/",
    image: cryptoverse,
  },
  {
    title: "GitHub Profile Fetcher",
    results: [
      { title: "Developed using HTML, CSS, and JavaScript." },
      {
        title:
          "Designed to enable users to search for GitHub usernames and retrieve high-level information about the corresponding GitHub profiles.",
      },
    ],
    link: "https://nirpendra09.github.io/GitProfileFetch.github.io",
    image: githubProfile,
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Real-world Results"
          title="Featured Projects"
          description="See how I transformed concepts into engaging digital experiences."
        />

        <div className="mt-10 md:mt-20 flex flex-col gap-20">
          {portfolioProjects.map((project, index) => (
            <Card
              key={project.title}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
              style={{
                top: `calc(64px + ${index * 40}px`,
              }}
            >
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  {/* <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex font-bold uppercase tracking-widest text-sm gap-2 text-transparent bg-clip-text">
                    <span>{project.company}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </div> */}

                  <h3 className="font-serif text-2xl md:text-4xl mt-2 md:mt-5">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result) => (
                      <li className="flex gap-2 text-sm md:text-base text-white/50">
                        <CheckCircleIcon className="size-5 md:size-6 flex-shrink-0" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={project.link} target="_blank">
                    <button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                      <span>Visit Live Site</span>
                      <ArrowUpRightIcon className="size-4" />
                    </button>
                  </a>
                </div>
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
