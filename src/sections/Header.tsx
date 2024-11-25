"use client";
import { useHash } from "@/hooks/useHash";
import { useEffect, useState, useCallback } from "react";
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

  const updateActiveSection = useCallback((newHash: NavItem["href"]) => {
    setActiveSection(newHash);
    history.replaceState(null, "", newHash);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Track all visible sections and their visibility percentages
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            const element = entry.target as HTMLElement;
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const visibleHeight =
              Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            const visiblePercentage =
              (visibleHeight / element.offsetHeight) * 100;

            return {
              id: element.id,
              visiblePercentage,
              top: rect.top,
            };
          });

        if (visibleSections.length === 0) return;

        // Sort sections by visibility percentage and proximity to top of viewport
        const bestSection = visibleSections.reduce((prev, current) => {
          if (current.visiblePercentage > prev.visiblePercentage)
            return current;
          if (current.visiblePercentage === prev.visiblePercentage) {
            return Math.abs(current.top) < Math.abs(prev.top) ? current : prev;
          }
          return prev;
        });

        updateActiveSection(`#${bestSection.id}` as NavItem["href"]);
      },
      {
        rootMargin: "-10% 0px -10% 0px", // Adjust the rootMargin to create a buffer zone
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Create more granular thresholds
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
  }, [updateActiveSection]);

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
