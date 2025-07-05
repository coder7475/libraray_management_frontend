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
import Pagination from "./Pagination";

// Redux actions for filter/sort
import { setFilter, setSortBy, setSort } from "@/global/slices/booksSlice";

const GENRES = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
  "OTHER",
];

const SORTABLE_COLUMNS = [
  { key: "title", label: "Title" },
  { key: "author", label: "Author" },
  { key: "genre", label: "Genre" },
  { key: "isbn", label: "ISBN" },
  { key: "copies", label: "Copies" },
  { key: "available", label: "Availability" },
  { key: "createdAt", label: "Created At" },
];

export function BookTable() {
  const { page, limit, filter, sortBy, sort } = useAppSelector(
    (state) => state.booksUI
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { data, isLoading, isError, error, isFetching } = useGetBooksQuery({
    page,
    limit,
    filter,
    sortBy,
    sort,
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

  // --- Filter and Sort UI Handlers ---
  const handleGenreFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(e.target.value || undefined));
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value));
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSort(e.target.value as "asc" | "desc"));
  };

  // --- Table Header with Sort Buttons ---
  const renderTableHead = () => (
    <TableRow>
      {[
        { key: "title", label: "Title" },
        { key: "author", label: "Author" },
        { key: "genre", label: "Genre" },
        { key: "isbn", label: "ISBN" },
        { key: "copies", label: "Copies" },
        { key: "available", label: "Availability" },
        { key: "actions", label: "Actions" },
      ].map((header) => {
        if (header.key === "actions") {
          return (
            <TableHead key={header.key} className="font-semibold">
              {header.label}
            </TableHead>
          );
        }
        // Only allow sort for certain columns
        const isSortable = [
          "title",
          "author",
          "genre",
          "isbn",
          "copies",
          "available",
        ].includes(header.key);
        return (
          <TableHead
            key={header.key}
            className="font-semibold select-none"
            style={{ cursor: isSortable ? "pointer" : undefined }}
            onClick={
              isSortable
                ? () => {
                    if (sortBy === header.key) {
                      // Toggle sort order
                      dispatch(setSort(sort === "asc" ? "desc" : "asc"));
                    } else {
                      dispatch(setSortBy(header.key));
                      dispatch(setSort("asc"));
                    }
                  }
                : undefined
            }
          >
            <span className="flex items-center gap-1">
              {header.label}
              {isSortable && sortBy === header.key && (
                <span>
                  {sort === "asc" ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 20 20"
                      className="inline"
                      fill="currentColor"
                    >
                      <path d="M10 6l-4 4h8l-4-4z" />
                    </svg>
                  ) : (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 20 20"
                      className="inline"
                      fill="currentColor"
                    >
                      <path d="M10 14l4-4H6l4 4z" />
                    </svg>
                  )}
                </span>
              )}
            </span>
          </TableHead>
        );
      })}
    </TableRow>
  );

  return (
    <div className="space-y-4">
      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between px-2 py-2 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <label htmlFor="genre-filter" className="text-sm font-medium">
            Genre:
          </label>
          <select
            id="genre-filter"
            className="border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-100"
            value={filter || ""}
            onChange={handleGenreFilterChange}
          >
            <option value="">All</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g.charAt(0) + g.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-by" className="text-sm font-medium">
            Sort By:
          </label>
          <select
            id="sort-by"
            className="border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-100"
            value={sortBy || "createdAt"}
            onChange={handleSortByChange}
          >
            {SORTABLE_COLUMNS.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
          <select
            id="sort-order"
            className="border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-100"
            value={sort || "desc"}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

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
              <TableHeader>{renderTableHead()}</TableHeader>
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
          <Pagination totalPages={totalPages} />
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
