import { useState } from "react";
import { useGetBooksQuery } from "@/services/books";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CalendarDays, BookOpen } from "lucide-react";
import formatDate from "@/services/formateDate";

export function BookGrid() {
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, isError, error, isFetching } = useGetBooksQuery({
    page,
    limit,
  });

  const books = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="p-4 space-y-4">
      {isLoading || isFetching ? (
        <div className="flex flex-row items-center justify-center gap-3 py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Loading Books...
          </span>
        </div>
      ) : isError ? (
        <div className="text-center text-red-500">
          Error fetching books: {String(error)}
        </div>
      ) : books.length === 0 ? (
        <div className="text-center text-gray-500">No books available.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <Card
                key={book._id}
                className="flex flex-col justify-between shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl transition-transform hover:scale-[1.025] bg-white dark:bg-gray-900"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base md:text-lg font-semibold line-clamp-2">
                      {book.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    by {book.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{book.genre}</Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <CalendarDays className="h-4 w-4" />
                      <span>
                        {(() => {
                          const dateValue = book.createdAt || book.updatedAt;
                          return formatDate(
                            typeof dateValue === "string"
                              ? dateValue
                              : dateValue instanceof Date
                                ? dateValue.toISOString()
                                : undefined
                          );
                        })()}
                      </span>
                    </div>
                  </div>
                  {/* Description with fixed height for alignment */}
                  <div className="flex-1">
                    <p
                      className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 min-h-[4.5rem]"
                      title={book.description}
                    >
                      {book.description}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    ISBN: <span className="font-mono">{book.isbn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span>Copies: {book.copies}</span>
                    {book.available ? (
                      <Badge variant="outline">Available</Badge>
                    ) : (
                      <Badge variant="destructive">Not Available</Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 pt-2">
                  <Button size="sm" variant="secondary">
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                  <Button size="sm">Borrow</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center flex-wrap gap-2 pt-4">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <Button
                  key={pageNumber}
                  size="sm"
                  variant={pageNumber === page ? "default" : "outline"}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            )}

            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
