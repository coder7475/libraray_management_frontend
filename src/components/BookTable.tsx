import { useState } from "react";
import { useGetBooksQuery } from "@/services/books";
import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

export function BookTable() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const { data, isLoading, isError, error, isFetching } = useGetBooksQuery({ page, limit });

  const books = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleClick = (id: string | undefined) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="space-y-4">
      {(isLoading || isFetching) && (
        <div className="flex flex-row items-center justify-center gap-3 py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-lg font-medium text-gray-700 dark:text-gray-200">Loading Books...</span>
        </div>
      )}

      {isError && (
        <div className="p-4 text-center text-red-500">Error fetching books: {String(error)}</div>
      )}

      {!isLoading && !isError && (
          <>
          <div className="shadow">
            <Table>
              <TableHeader className="w-[100px]">
                <TableRow>
                  <TableHead className="font-semibold">Title</TableHead>
                  <TableHead className="font-semibold">Author</TableHead>
                  <TableHead className="font-semibold">Genre</TableHead>
                  <TableHead className="font-semibold">ISBN</TableHead>
                  <TableHead className="font-semibold">Copies</TableHead>
                  <TableHead className="font-semibold">Availability</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-[100px]">
                {books.map((book) => (
                  <TableRow
                    key={book._id}
                    onClick={(e) => {
                      // Prevent navigation if clicking on an action button
                      e.preventDefault();
                      if (
                        (e.target as HTMLElement).closest("button")
                      ) {
                        return;
                      }
                      handleClick(book?._id);
                    }}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{book.genre}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs">{book.isbn}</span>
                    </TableCell>
                    <TableCell>{book.copies}</TableCell>
                    <TableCell>
                      {book.available ? (
                        <Badge variant="outline">Available</Badge>
                      ) : (
                        <Badge variant="destructive">Not Available</Badge>
                      )}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={e => {
                          e.stopPropagation();
                          // Edit logic here
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={e => {
                          e.stopPropagation();
                          // Delete logic here
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        onClick={e => {
                          e.stopPropagation();
                          // Borrow logic here
                        }}
                      >
                        Borrow
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <Button
                key={pageNumber}
                size="sm"
                variant={pageNumber === page ? "default" : "outline"}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </Button>
            ))}

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
