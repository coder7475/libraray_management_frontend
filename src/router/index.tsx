import App from "@/App";
import Books from "@/pages/Books";
import CreateBookPage from "@/pages/CreateBook";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {            
            index: true,
            element: <Home/>
        },
        {
            path: "books",
            element: <Books />
        },
        {
          path: "create-book",
          element: <CreateBookPage />
        },
        {
          path: "*",
          element: <NotFound />
        },

      ]
    },
]);

export default router;