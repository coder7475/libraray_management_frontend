import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import { BookGrid } from "@/components/BookGrid";

const Home = () => {
  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 lg:px-10 lg:py-6 shadow-lg bg-gradient-to-b from-white/90 to-white/70 dark:from-gray-900/90 dark:to-gray-900/70 backdrop-blur-md">
        <Navbar />
      </header>
      <main className="flex flex-col items-center min-h-[70vh] h-full w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-10 px-2 space-y-10">
        <div className="w-full max-w-5xl">
          <Hero />
        </div>
        <div className="w-full max-w-6xl">
          <BookGrid />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;