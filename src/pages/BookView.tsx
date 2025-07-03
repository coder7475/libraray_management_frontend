import { useParams } from "react-router";
import { useGetBookByIdQuery } from "@/services/books";
import formatDate from "@/services/formateDate";
import { Loader2, BookOpen, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const BookView = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetBookByIdQuery({ _id: id || "" });
  const book = data?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Loading Book...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 text-lg">
        Error fetching book: {String(error)}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 text-lg">
        Book not found.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="flex-1 flex items-center justify-center px-2 sm:px-4 py-10">
          <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-8 mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <BookOpen className="h-8 w-8 text-primary flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left flex-1 break-words">
                {book?.title}
              </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-4">
              <div className="text-gray-600 dark:text-gray-300 flex items-center">
                <span className="font-semibold mr-1">Author:</span>
                <span className="truncate">{book?.author}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-xs sm:text-sm">
                  {book.genre}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {formatDate(
                      typeof book.createdAt === "string"
                        ? book.createdAt
                        : book.createdAt instanceof Date
                        ? book.createdAt.toISOString()
                        : undefined
                    )}
                  </span>
                </div>
              </div>
              <div className="text-gray-600 dark:text-gray-300 col-span-1 sm:col-span-2">
                <span className="font-semibold">ISBN:</span>{" "}
                <span className="font-mono break-all">{book.isbn}</span>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold">Copies:</span> {book.copies}
              </div>
              <div>
                {book.available ? (
                  <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-xs">
                    Not Available
                  </Badge>
                )}
              </div>
            </div>
            <div className="mb-6">
              <span className="font-semibold block mb-1 text-gray-800 dark:text-gray-200">Description:</span>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line break-words">
                {book.description || "No description available."}
              </p>
            </div>
            <div className="mt-4 text-xs text-gray-400 text-right">
              Last updated:{" "}
              {formatDate(
                typeof book.updatedAt === "string"
                  ? book.updatedAt
                  : book.updatedAt instanceof Date
                  ? book.updatedAt.toISOString()
                  : undefined
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BookView;