"use client";
import { useHash } from "@/hooks/useHash";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Menu, X } from "lucide-react";

type NavItem = {
  title: string;
  href: `#${string}`;
};

const navItems: NavItem[] = [
  { title: "Home", href: "#home" },
  { title: "Experience", href: "#experience" },
  { title: "Projects", href: "#projects" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

export const Header = () => {
  const [activeSection, setActiveSection] = useState<NavItem["href"]>("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hash = useHash();

  useEffect(() => {
    if (hash && activeSection !== hash) {
      setActiveSection(hash as NavItem["href"]);
    }
  }, [hash]);

  useEffect(() => {
    let currentSection: NavItem["href"] | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rect = entry.target.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const visibleHeight =
            Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          const visiblePercentage =
            (visibleHeight / entry.target.offsetHeight) * 100;

          const isSmallSection =
            entry.target.offsetHeight < viewportHeight * 0.5;
          const threshold = isSmallSection ? 30 : 50;

          if (entry.isIntersecting && visiblePercentage >= threshold) {
            const newHash = `#${entry.target.id}` as NavItem["href"];

            if (currentSection !== newHash) {
              currentSection = newHash;
              setActiveSection(newHash);
              history.replaceState(null, "", newHash);
            }
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    navItems.forEach(({ href }) => {
      const sectionId = href.slice(1);
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: NavItem["href"]) => {
    setActiveSection(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-3 w-full z-10">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-center items-center">
        <div className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
          {navItems.map((navItem) => (
            <a
              key={navItem.href}
              href={navItem.href}
              className={twMerge(
                "nav-item",
                activeSection === navItem.href &&
                  "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
              )}
              onClick={() => handleNavClick(navItem.href)}
            >
              {navItem.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={twMerge(
            "fixed top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur border border-white/15",
            isMobileMenuOpen && "z-10"
          )}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur pt-16">
            <nav className="flex flex-col items-center gap-4 p-4">
              {navItems.map((navItem) => (
                <a
                  key={navItem.href}
                  href={navItem.href}
                  className={twMerge(
                    "text-lg py-2 px-4 rounded-full transition-colors",
                    "text-white hover:bg-white/10",
                    activeSection === navItem.href &&
                      "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
                  )}
                  onClick={() => handleNavClick(navItem.href)}
                >
                  {navItem.title}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
