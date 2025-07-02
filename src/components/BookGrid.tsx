import { useGetBooksQuery } from "@/services/books";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BookGrid() {
  const { data, isLoading, isError, error } = useGetBooksQuery();

  if (isLoading) {
    return <div className="p-4 text-center">Loading books...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Error fetching books: {String(error)}</div>;
  }

  if (!data?.data?.length) {
    return <div className="p-4 text-center text-gray-500">No books available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {data.data.map((book) => (
        <Card key={book._id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>by {book.author}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            {/* You could add more details here if you want */}
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="secondary" size="sm"
              // onClick={() => onEdit(book)}
            >
              Edit
            </Button>
            <Button variant="destructive" size="sm"
              // onClick={() => onDelete(book.id)}
            >
              Delete
            </Button>
            <Button variant="default" size="sm"
              // onClick={() => onBorrow(book.id)}
            >
              Borrow
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
