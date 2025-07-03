import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-primary-foreground border-t">
      <div className="container flex flex-wrap items-center justify-center px-4 py-8 mx-auto lg:justify-between">
        <ul className="flex items-center space-x-4 text-sm font-medium text-gray-700 dark:text-gray-200">
          <li>
            <Link
              to="/"
              className="hover:text-primary transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </li>
        </ul>
        <div className="flex justify-center space-x-4 mt-4 lg:mt-0">
          <a
            href="https://www.facebook.com/rhfahadchy"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <Facebook />
          </a>
          <a
            href="https://x.com/robiul7475"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <Twitter />
          </a>
          <a
            href="https://www.linkedin.com/in/robiul7475"
            aria-label="Linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <Linkedin />
          </a>
        </div>
      </div>
      <div className="pb-2">
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          &copy; 2024 All rights reserved by your website.
        </p>
      </div>
    </footer>
  );
}
