import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-foreground border-t dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap justify-center items-center gap-2 md:gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
          <li>
            <Link
              to="/"
              className="transition-colors duration-200 px-2 py-1 rounded hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="transition-colors duration-200 px-2 py-1 rounded hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="transition-colors duration-200 px-2 py-1 rounded hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/terms"
              className="transition-colors duration-200 px-2 py-1 rounded hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Terms &amp; Conditions
            </Link>
          </li>
        </ul>
        <div className="flex justify-center mt-4 md:mt-0 space-x-4">
          <a
            href="https://www.facebook.com/rhfahadchy"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Facebook />
          </a>
          <a
            href="https://x.com/robiul7475"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Twitter />
          </a>
          <a
            href="https://www.linkedin.com/in/robiul7475"
            aria-label="Linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Linkedin />
          </a>
        </div>
      </div>
      <div className="pb-2">
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          &copy; {currentYear} All rights reserved by Book Library.
        </p>
      </div>
    </footer>
  );
}
