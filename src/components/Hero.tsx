import { Link } from "react-router";
import { Button } from "./ui/button";
import { BookOpen, Plus } from "lucide-react";

const Hero = () => {
    return (
        <div className="bg-gradient-to-br from-secondary to-primary-foreground dark:from-gray-900 dark:to-gray-800 w-full">
          <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Welcome to Library Management System
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Manage your library collection efficiently with our modern, user-friendly system. 
                Add books, track borrowings, and keep your library organized.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/books" className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-secondary dark:text-primary-300" />
                    <span>Browse Books</span>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/create-book" className="flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-primary dark:text-primary-300" />
                    <span>Add New Book</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
    );
};

export default Hero;