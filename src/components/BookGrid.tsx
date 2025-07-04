import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useGetBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "@/services/books";
import type { IBook } from "@/services/types";
import type { UpdateBookFromValues } from "@/validators/CreateBookSchema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import EditBookModal from "./EditBookModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import BorrowBookModal from "./BorrowBookModal";
import BookCard from "./BookCard";

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
              <BookCard
                key={book._id}
                book={book}
                onCardClick={handleCardClick(book._id)}
                onEditClick={(e) => {
                  e.stopPropagation();
                  openModal(setEditBook)(book);
                }}
                onDeleteClick={(e) => {
                  e.stopPropagation();
                  openModal(setBookToDelete)(book);
                }}
                onBorrowClick={(e) => {
                  e.stopPropagation();
                  setBorrowModalBook(book);
                }}
              />
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
