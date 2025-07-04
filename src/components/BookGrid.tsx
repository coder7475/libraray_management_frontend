import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useGetBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "@/services/books";
import type { IBook } from "@/services/types";
import type { UpdateBookFromValues } from "@/validators/CreateBookSchema";
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
import { toast } from "sonner";
import formatDate from "@/services/formateDate";
import EditBookModal from "./EditBookModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import BorrowBookModal from "./BorrowBookModal";

export function BookGrid() {
  const [page, setPage] = useState(1);
  const limit = 8;
  const navigate = useNavigate();

  const { data, isLoading, isError, error, isFetching } = useGetBooksQuery({
    page,
    limit,
  });
  const books = data?.data || [];
  const totalPages = data?.totalPages || 1;

  // Edit Modal
  const [editBook, setEditBook] = useState<IBook | null>(null);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  // Delete Modal
  const [bookToDelete, setBookToDelete] = useState<IBook | null>(null);
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  // Borrow Modal
  const [borrowModalBook, setBorrowModalBook] = useState<IBook | null>(null);

  // Reusable modal helpers
  const openModal = (setter: (book: IBook) => void) => (book: IBook) =>
    setter(book);
  const closeModal = (setter: (book: null) => void) => () => setter(null);

  const handleEditSubmit = async (values: UpdateBookFromValues) => {
    if (!editBook?._id) return;
    try {
      const copies = Number(values.copies);
      const available = copies > 0 ? values.available : false;

      await updateBook({
        id: editBook._id,
        data: { ...values, copies, available },
      }).unwrap();

      toast("Book updated successfully!");
      setEditBook(null);
    } catch (error) {
      console.error(error);
      toast("Failed to update book.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!bookToDelete?._id) return;
    try {
      await deleteBook({ id: bookToDelete._id }).unwrap();
      toast("Book deleted successfully!");
      setBookToDelete(null);
    } catch (error) {
      console.error(error);
      toast("Failed to delete book.");
    }
  };

  const handleCardClick = (id: string | undefined) => (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest("button")) {
      navigate(`/books/${id}`);
    }
  };

  return (
    <div className="p-2 sm:p-4 space-y-4">
      {isLoading || isFetching ? (
        <div className="flex items-center justify-center gap-3 py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-base sm:text-lg font-medium">
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
                onClick={handleCardClick(book._id)}
                className="cursor-grab flex flex-col justify-between shadow-lg border rounded-xl transition-transform hover:scale-[1.025]"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="text-base font-semibold line-clamp-2">
                      {book.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-1 text-xs sm:text-sm">
                    by {book.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs sm:text-sm">
                      {book.genre}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <CalendarDays className="h-4 w-4" />
                      <span>
                        {formatDate(
                          (book.updatedAt || book.createdAt)?.toString()
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm line-clamp-4 min-h-20">
                    {book.description}
                  </p>
                  <div className="text-xs">
                    ISBN: <span className="font-mono">{book.isbn}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span>Copies: {book.copies}</span>
                    {book.available ? (
                      <Badge variant="outline">Available</Badge>
                    ) : (
                      <Badge variant="destructive">Not Available</Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap justify-end space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(setEditBook)(book);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(setBookToDelete)(book);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBorrowModalBook(book);
                    }}
                  >
                    Borrow
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center flex-wrap gap-2 pt-4">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <Button
                key={num}
                size="sm"
                variant={num === page ? "default" : "outline"}
                onClick={() => setPage(num)}
              >
                {num}
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

      {/* Modals */}
      <EditBookModal
        open={!!editBook}
        onClose={closeModal(setEditBook)}
        book={editBook}
        onSubmit={handleEditSubmit}
        isLoading={isUpdating}
      />
      <DeleteConfirmModal
        open={!!bookToDelete}
        onClose={closeModal(setBookToDelete)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        bookTitle={bookToDelete?.title || ""}
      />
      <BorrowBookModal
        open={!!borrowModalBook}
        onOpenChange={(open) => !open && setBorrowModalBook(null)}
        book={borrowModalBook?._id}
        availableCopies={borrowModalBook?.copies ?? 0}
      />
    </div>
  );
}
