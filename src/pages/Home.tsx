import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import Hero from "@/components/Hero";
import { BookGrid } from "@/components/BookGrid";

const Home = () => {
  return (
    <>
      <header className="flex items-center justify-between lg:px-6 lg:py-4 shadow-md bg-white dark:bg-gray-900">
        <Navbar />
      </header>
      <main className="flex flex-col items-center min-h-[60vh] space-y-6 h-screen">
        <Hero />
        <BookGrid />
      </main>
      <Footer />
    </>
  );
};

export default Home;