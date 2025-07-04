// components/borrow/BorrowBookModal.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBorrowBookMutation } from "@/services/books";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    book: string;
    availableCopies: number;
  }

export default function BorrowBookModal({ open, onOpenChange, book, availableCopies }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (quantity < 1 || quantity > availableCopies) {
      toast.error(`Quantity must be between 1 and ${availableCopies}`);
      return;
    }
    try {
      await borrowBook({ book, quantity, dueDate }).unwrap();
      toast.success("Book borrowed successfully!");
      onOpenChange(false);
      navigate("/borrow-summary");
    } catch {
      toast.error("Failed to borrow book.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              min={1}
              max={availableCopies}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Borrowing..." : "Borrow"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
