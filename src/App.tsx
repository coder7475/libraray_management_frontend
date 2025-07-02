import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900">        
        <Navbar />
      </header>
      <main className="flex-1 px-6 py-8">
        <Outlet />
      </main>
      <footer className="px-6 py-4 bg-gray-100 dark:bg-gray-800 text-center text-sm text-gray-500">
        Footer
      </footer>
    </div>
  );
}

export default App;
