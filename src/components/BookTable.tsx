import { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { useGetBooksQuery } from "@/services/books";
import { Button } from "@/components/ui/button";

export function BookTable() {
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, isError, error, isFetching } = useGetBooksQuery({ page, limit });

  const books = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-4">
      {(isLoading || isFetching) && (
        <div className="p-4 text-center">Loading books...</div>
      )}

      {isError && (
        <div className="p-4 text-center text-red-500">Error fetching books: {String(error)}</div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="overflow-x-auto rounded-xl shadow">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="font-semibold">Title</TableCell>
                  <TableCell className="font-semibold">Author</TableCell>
                  <TableCell className="font-semibold">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell className="space-x-2">
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        // onClick={() => onEdit(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        // onClick={() => onDelete(book.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        // onClick={() => onBorrow(book.id)}
                      >
                        Borrow
                      </button>
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
