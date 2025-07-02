import { Outlet } from "react-router";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">      
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
