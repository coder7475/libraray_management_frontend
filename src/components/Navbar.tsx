import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggler";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/books", label: "All Books" },
    { href: "/add-book", label: "Add Book" },
    { href: "/borrow-summary", label: "Borrow Summary" },
  ];

  return (
    <nav className="w-full bg-background">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6V4a2 2 0 00-2-2H6a2 2 0 00-2 2v16a2 2 0 002 2h4a2 2 0 002-2v-2m0-12h4a2 2 0 012 2v16a2 2 0 01-2 2h-4"
            />
          </svg>
          <span className="font-bold text-lg sm:text-xl md:text-2xl text-primary whitespace-nowrap">
            Book Library
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4 lg:gap-6">
              {navLinks.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink
                    href={href}
                    className="px-3 py-2 rounded-md hover:bg-primary/10 transition-colors font-medium"
                  >
                    {label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-primary/10 focus:outline-none transition-colors"
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden transition-all overflow-hidden bg-background border-t border-border
          ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col gap-2 px-4 py-2">
            {navLinks.map(({ href, label }) => (
              <NavigationMenuItem key={href}>
                <NavigationMenuLink
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md hover:bg-primary/10 transition-colors font-medium"
                >
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex justify-end px-4 py-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
