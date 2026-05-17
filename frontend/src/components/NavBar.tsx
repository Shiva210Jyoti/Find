"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/upload", label: "Upload" },
  { href: "/gallery", label: "Gallery" },
  { href: "/search", label: "Search" },
  { href: "/clusters", label: "Clusters" },
];

type Theme = "light" | "dark";

export default function NavBar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("light");

  // Apply the saved theme when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("find-theme") as Theme | null;
    const initialTheme = savedTheme === "dark" ? "dark" : "light";

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    document.documentElement.style.colorScheme = initialTheme;

    setTheme(initialTheme);
  }, []);

  // Toggle between light and dark
  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;

    localStorage.setItem("find-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <div className="flex min-w-0 items-center gap-2 overflow-x-auto rounded-full border border-[var(--frost)] bg-[color:var(--frost-soft)] p-1">
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? "page" : undefined}
          className={
            pathname === href
              ? "rounded-full bg-[color:var(--frost-soft)] px-3 py-1.5 text-sm font-medium text-[color:var(--near-white)] sm:px-4"
              : "rounded-full px-3 py-1.5 text-sm font-medium text-[color:var(--silver)] transition hover:bg-[color:var(--frost-soft)] hover:text-[color:var(--near-white)] sm:px-4"
          }
        >
          {label}
        </Link>
      ))}

      {/* Theme Toggle Button */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--frost)] bg-[color:var(--frost-soft)] text-[color:var(--near-white)] transition hover:scale-105"
      >
        {theme === "light" ? (
          <Moon size={18} strokeWidth={2.2} />
        ) : (
          <Sun size={18} strokeWidth={2.2} />
        )}
      </button>
    </div>
  );
}