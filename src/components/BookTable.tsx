import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import {
  useDeleteBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "@/services/books";
import type { IBook } from "@/services/types";
import type { UpdateBookFromValues } from "@/validators/CreateBookSchema";

import EditBookModal from "./EditBookModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import BorrowBookModal from "./BorrowBookModal";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setPage } from "@/global/slices/booksSlice";
import LimitSelector from "./LimitSelector";

export function BookTable() {
  const dispatch = useAppDispatch();
  const { page, limit } = useAppSelector((state) => state.booksUI);

  const navigate = useNavigate();

  const { data, isLoading, isError, error, isFetching } = useGetBooksQuery({
    page,
    limit,
  });
  const books = data?.data || [];
  const totalPages = data?.totalPages || 1;

  // Edit Modal State
  const [editBook, setEditBook] = useState<IBook | null>(null);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  // Delete Modal State
  const [bookToDelete, setBookToDelete] = useState<IBook | null>(null);
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  // Borrow Modal State
  const [borrowModalBook, setBorrowModalBook] = useState<IBook | null>(null);
  const isBorrowModalOpen = !!borrowModalBook;

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
      toast("Failed to delete book. Try again.");
    }
  };

  const handleRowClick = (id: string | undefined) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (!(e.target as HTMLElement).closest("button")) {
      navigate(`/books/${id}`);
    }
  };

  const renderBadge = (
    text: string,
    variant: "outline" | "destructive" = "outline"
  ) => <Badge variant={variant}>{text}</Badge>;

  return (
    <div className="space-y-4">
      {(isLoading || isFetching) && (
        <div className="flex flex-row items-center justify-center gap-3 py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Loading Books...
          </span>
        </div>
      )}

      {isError && (
        <div className="p-4 text-center text-red-500">
          Error fetching books: {String(error)}
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    "Title",
                    "Author",
                    "Genre",
                    "ISBN",
                    "Copies",
                    "Availability",
                    "Actions",
                  ].map((header) => (
                    <TableHead key={header} className="font-semibold">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow
                    key={book._id}
                    onClick={handleRowClick(book._id)}
                    className="cursor-grab hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{renderBadge(book.genre)}</TableCell>
                    <TableCell>
                      <span className="font-mono text-xs">{book.isbn}</span>
                    </TableCell>
                    <TableCell>{book.copies}</TableCell>
                    <TableCell>
                      {book.available
                        ? renderBadge("Available")
                        : renderBadge("Not Available", "destructive")}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        className="cursor-pointer"
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
                        className="cursor-pointer"
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
                        className="cursor-pointer"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBorrowModalBook(book);
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

          {/* Pagination */}
          <div className="flex justify-center flex-wrap gap-2 pt-4">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => dispatch(setPage(page - 1))}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <Button
                key={num}
                size="sm"
                variant={num === page ? "default" : "outline"}
                onClick={() => dispatch(setPage(num))}
              >
                {num}
              </Button>
            ))}
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => dispatch(setPage(page + 1))}
            >
              Next
            </Button>
          </div>
          <LimitSelector />
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
        open={isBorrowModalOpen}
        onOpenChange={(open) => !open && setBorrowModalBook(null)}
        book={borrowModalBook?._id}
        availableCopies={borrowModalBook?.copies ?? 0}
      />
    </div>
  );
}
