import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button } from "@/components/ui/button";
import { setPage } from "@/global/slices/booksSlice";
import LimitSelector from "./LimitSelector";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const dispatch = useAppDispatch();
  const page = useAppSelector((s) => s.booksUI.page);

  return (
    <div className="flex justify-center flex-wrap gap-2 pt-4">
      <Button
        className="cursor-pointer"
        size="sm"
        variant="outline"
        disabled={page === 1}
        onClick={() => dispatch(setPage(page - 1))}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <Button
          className="cursor-pointer"
          key={num}
          size="sm"
          variant={num === page ? "default" : "outline"}
          onClick={() => dispatch(setPage(num))}
        >
          {num}
        </Button>
      ))}
      <Button
        className="cursor-pointer"
        size="sm"
        variant="outline"
        disabled={page === totalPages}
        onClick={() => dispatch(setPage(page + 1))}
      >
        Next
      </Button>
      <LimitSelector />
    </div>
  );
}
