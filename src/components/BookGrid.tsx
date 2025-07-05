import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useGetBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "@/services/books";
import type { IBook } from "@/services/types";
import type { UpdateBookFromValues } from "@/validators/CreateBookSchema";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import EditBookModal from "./EditBookModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import BorrowBookModal from "./BorrowBookModal";
import BookCard from "./BookCard";
import GenreSelector from "./GenreSelector";

export function BookGrid() {
  // navigation
  const navigate = useNavigate();

  // Fetch books (for the grid)
  const { data, isLoading, isError, error, isFetching } = useGetBooksQuery({
    page: 1,
    limit: 12,
  });
  const books = data?.data || [];

  // Show top 4 books by copies
  const topBooks = [...books]
    .sort((a, b) => (b.copies ?? 0) - (a.copies ?? 0))
    .slice(0, 4);

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

  // Handle "View More" button click
  const handleViewMore = () => {
    navigate("/books");
  };

  return (
    <div className="p-2 sm:p-4 space-y-10 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Book Grid Section */}
      <section>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center text-primary dark:text-primary-300 tracking-tight drop-shadow">
          Latest Books
        </h2>
        {isLoading || isFetching ? (
          <div className="flex items-center justify-center gap-3 py-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary dark:text-primary-300" />
            <span className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-200">
              Loading Books...
            </span>
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 dark:text-red-400">
            Error fetching books: {String(error)}
          </div>
        ) : topBooks.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No books available.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {topBooks.map((book) => (
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
            {/* View More Button */}
            <div className="flex justify-center mt-6">
              <button
                className="cursor-pointer px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
                onClick={handleViewMore}
              >
                View More
              </button>
            </div>
          </>
        )}
      </section>

      {/* Genre Selection Section */}
      <GenreSelector />
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
