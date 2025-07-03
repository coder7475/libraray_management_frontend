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
import { useNavigate } from "react-router";

export function BookGrid() {
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, isError, error, isFetching } = useGetBooksQuery({
    page,
    limit,
  });

  const books = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const CARD_HEIGHT =
    "h-auto min-h-[260px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[420px]"; // allow auto height on mobile
  const HEADER_HEIGHT =
    "min-h-[44px] sm:min-h-[56px] md:min-h-[64px]"; // slightly smaller on mobile
  const CONTENT_HEIGHT =
    "flex-1 min-h-[60px] sm:min-h-[100px] md:min-h-[160px] lg:min-h-[180px]";
  const FOOTER_HEIGHT =
    "min-h-[36px] sm:min-h-[44px] md:min-h-[48px]";

  const navigate = useNavigate();
  const handleClick = (id: string | undefined) => {
      navigate(`/books/${id}`);
  };

  return (
    <div className="p-2 sm:p-4 space-y-4">
      {isLoading || isFetching ? (
        <div className="flex flex-row items-center justify-center gap-3 py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-200">
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
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {books.map((book) => (
              <Card
                key={book._id}
                className={`cursor-grab flex flex-col justify-between shadow-lg border border-gray-200 dark:border-gray-700 rounded-xl transition-transform hover:scale-[1.025] bg-white dark:bg-gray-900 ${CARD_HEIGHT}`}
                onClick={
                  (e) => {
                    e.preventDefault();
                    if (
                      (e.target as HTMLElement).closest("button")
                    ) {
                      return;
                    }
                    handleClick(book?._id);
                  }
                }
              >
                <CardHeader className={`pb-2 ${HEADER_HEIGHT}`}>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base md:text-lg font-semibold line-clamp-2">
                      {book.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    by {book.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className={`flex flex-col space-y-2 ${CONTENT_HEIGHT}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {book.genre}
                    </Badge>
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
                      className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-4 min-h-[3rem] sm:min-h-[4rem] max-h-[4.5rem] overflow-hidden"
                      title={book.description}
                    >
                      {book.description && book.description.length > 150
                        ? book.description.slice(0, 80) + "…"
                        : book.description}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500 break-all">
                    ISBN: <span className="font-mono">{book.isbn}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span>Copies: {book.copies}</span>
                    {book.available ? (
                      <Badge variant="outline" className="text-xs">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        Not Available
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className={`flex flex-wrap justify-end space-x-2 pt-2 ${FOOTER_HEIGHT}`}>
                  <Button size="sm" variant="secondary" className="w-full sm:w-auto cursor-pointer">
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" className="w-full sm:w-auto cursor-pointer">
                    Delete
                  </Button>
                  <Button size="sm" className="w-full sm:w-auto cursor-pointer">
                    Borrow
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="min-w-[80px] cursor-pointer"
            >
              Previous
            </Button>

            <div className="flex flex-wrap gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Button
                    key={pageNumber}
                    size="sm"
                    variant={pageNumber === page ? "default" : "outline"}
                    onClick={() => setPage(pageNumber)}
                    className="cursor-pointer min-w-[36px] px-2"
                  >
                    {pageNumber}
                  </Button>
                )
              )}
            </div>

            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="min-w-[80px] cursor-pointer"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
