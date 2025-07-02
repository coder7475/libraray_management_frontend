import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { useGetBooksQuery } from "@/services/books";

export function BookTable() {
  const { data, isLoading, isError, error } = useGetBooksQuery();

  if (isLoading) {
    return <div className="p-4 text-center">Loading books...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Error fetching books: {String(error)}</div>;
  }

  return (
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
          {data?.data?.map((book) => (
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
  );
}
