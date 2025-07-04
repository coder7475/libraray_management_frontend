import App from "@/App";
import About from "@/pages/About";
import Books from "@/pages/Books";
import BookView from "@/pages/BookView";
import BorrowSummary from "@/pages/BorrowSummury";
import ContactUs from "@/pages/ContactUs";
import CreateBookPage from "@/pages/CreateBook";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Terms from "@/pages/Terms";
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
          path: "books/:id",
          element: <BookView />
        },
        {
          path: "create-book",
          element: <CreateBookPage />
        },
        {
          path: "about",
          element: <About/>
        },
        {
          path: "contact",
          element: <ContactUs />
        },
        {
          path: "terms",
          element: <Terms />
        },
        {
          path: "borrow-summary",
          element: <BorrowSummary />,
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },
]);

export default router;