"use client";

import { useHash } from "@/hooks/useHash";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const navItems = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "Projects",
    href: "#projects",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

export const Header = () => {
  const [activeSection, setActiveSection] = useState("#home");
  const hash = useHash();
  useEffect(() => {
    if (hash && activeSection != hash) {
      setActiveSection(hash);
      console.log("active: ", hash);
    }
  }, [hash]);

  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-10">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        {navItems.map((navItem) => (
          <a
            href={navItem.href}
            className={twMerge(
              "nav-item",

              activeSection === navItem.href &&
                "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
            )}
          >
            {navItem.title}
          </a>
        ))}
      </nav>
    </div>
  );
};
