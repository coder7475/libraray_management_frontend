import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-primary-foreground">
      <div className="container flex flex-wrap items-center justify-center px-4 py-8 mx-auto lg:justify-between">
        <ul className="flex items-center space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact US</Link></li>
          <li><Link to="/terms">Terms & Condition</Link></li>
        </ul>
        <div className="flex justify-center space-x-4 mt-4 lg:mt-0">
          {/* Social links should use <a> for external URLs, but keeping as # for placeholder */}
          <a href="#" aria-label="Facebook"><Facebook /></a>
          <a href="#" aria-label="Twitter"><Twitter /></a>
          <a href="#" aria-label="Instagram"><Instagram /></a>
          <a href="#" aria-label="Linkedin"><Linkedin /></a>
        </div>
      </div>
      <div className="pb-2">
        <p className="text-center">@2024 All rights reserved by your website.</p>
      </div>
    </footer>
  );
}
