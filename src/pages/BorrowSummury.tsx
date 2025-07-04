import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, AlertTriangle } from 'lucide-react';
import { useGetBorrowSummuryQuery } from "@/services/books";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummuryQuery();


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-8">
        <Card className="w-full max-w-3xl shadow-lg rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
              Borrowed Books Summary
            </h2>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-8 min-h-[180px]">
                <Loader2 className="animate-spin h-8 w-8 text-primary mb-2" />
                <span className="text-gray-600 dark:text-gray-300">Loading summary...</span>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center p-8 min-h-[180px]">
                <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
                <span className="text-red-600 dark:text-red-400 font-medium">Failed to Fetch Error Summury</span>
              </div>
            ) : !data?.data || data.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 min-h-[180px]">
                <span className="text-gray-500 dark:text-gray-400">No borrowed books found.</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base font-semibold">Book Title</TableHead>
                      <TableHead className="text-base font-semibold">ISBN</TableHead>
                      <TableHead className="text-base font-semibold text-center">Total Quantity Borrowed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.data.map((item, index) => (
                      <TableRow
                        key={index}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <TableCell className="font-medium">{item.book.title}</TableCell>
                        <TableCell>
                          <span className="font-mono text-xs">{item.book.isbn}</span>
                        </TableCell>
                        <TableCell className="text-center">{item.totalQuantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BorrowSummary;
