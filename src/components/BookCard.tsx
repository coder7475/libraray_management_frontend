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
import { CalendarDays, BookOpen } from "lucide-react";
import type { IBook } from "@/services/types";
import formatDate from "@/services/formateDate";

interface Props {
  book: IBook;
  onCardClick: (e: React.MouseEvent) => void;
  onEditClick: (e: React.MouseEvent) => void;
  onDeleteClick: (e: React.MouseEvent) => void;
  onBorrowClick: (e: React.MouseEvent) => void;
}

export default function BookCard({
  book,
  onCardClick,
  onEditClick,
  onDeleteClick,
  onBorrowClick,
}: Props) {
  return (
    <Card
      onClick={onCardClick}
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
              {formatDate((book.updatedAt || book.createdAt)?.toString())}
            </span>
          </div>
        </div>
        <p className="text-xs sm:text-sm line-clamp-4 min-h-20">
          {book.description && book.description.length > 90
            ? book.description.slice(0, 80) + "…"
            : book.description}
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
          className="cursor-pointer"
          size="sm"
          variant="secondary"
          onClick={onEditClick}
        >
          Edit
        </Button>
        <Button
          className="cursor-pointer"
          size="sm"
          variant="destructive"
          onClick={onDeleteClick}
        >
          Delete
        </Button>
        <Button className="cursor-pointer" size="sm" onClick={onBorrowClick}>
          Borrow
        </Button>
      </CardFooter>
    </Card>
  );
}
