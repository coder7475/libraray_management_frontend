import { BookTable } from "@/components/BookTable";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const Books = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="w-full shadow-md bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <Navbar />
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-start py-6 px-2 sm:px-4 md:px-8">
        <div className="w-full max-w-6xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            All Books
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-2 sm:p-4">
            <BookTable />
          </div>
        </div>
      </main>
      <footer className="w-full mt-auto">
        <Footer />
      </footer>

    </div>
  );
};

export default Books;