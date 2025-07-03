import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
            <Navbar />

            <main className="flex flex-col items-center justify-center min-h-[60vh] w-full px-4 py-8">
                <div className="w-full max-w-3xl flex flex-col items-center space-y-8">
                    <h1 className="text-4xl font-extrabold text-primary mb-2 text-center">
                        About Book Library
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl text-center">
                        <span className="font-semibold">Book Library</span> is a modern Library Management System designed to make managing books, users, and borrowing activities simple and efficient. 
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl w-full flex flex-col items-center">
                        <h2 className="text-2xl font-bold mb-3 text-primary text-center">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-center ">
                            We aim to empower libraries and readers by providing an intuitive, reliable, and feature-rich system that streamlines library operations and enhances the reading experience.
                        </p>
                        <h2 className="text-2xl font-bold mb-3 text-primary text-center">Key Features</h2>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 text-left w-full max-w-md mx-auto pl-4">
                            <li>Easy book cataloging and management</li>
                            <li>Quick search and filter for books by title, author, or genre</li>
                            <li>Effortless borrowing and returning process</li>
                            <li>User-friendly dashboard for librarians and members</li>
                            <li>Real-time availability status</li>
                            <li>Responsive design for all devices</li>
                        </ul>
                    </div>
                    <p className="text-md text-gray-500 dark:text-gray-400 text-center max-w-xl">
                        Thank you for choosing <span className="font-semibold text-primary">Book Library</span> to manage your library needs. We are committed to continuous improvement and welcome your feedback!
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;