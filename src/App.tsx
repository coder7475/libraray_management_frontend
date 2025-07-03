import { Outlet } from "react-router";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">      
      <main className="flex-1">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
