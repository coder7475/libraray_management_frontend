import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBorrowBookMutation } from "@/services/books";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: string | undefined;
  availableCopies: number;
}

export default function BorrowBookModal({
  open,
  onOpenChange,
  book,
  availableCopies = 0,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<{ quantity?: string; dueDate?: string }>(
    {}
  );
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { quantity?: string; dueDate?: string } = {};

    if (!quantity || isNaN(quantity)) {
      newErrors.quantity = "Quantity is required.";
    } else if (quantity < 1 || quantity > availableCopies) {
      newErrors.quantity = `Quantity must be between 1 and ${availableCopies}`;
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required.";
    } else {
      // Check if dueDate is in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(dueDate);
      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
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
          <DialogDescription>
            Specify the quantity and due date to borrow this book. You can
            borrow up to {availableCopies} copies.
          </DialogDescription>
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
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setQuantity(isNaN(val) ? 1 : val);
                setErrors((prev) => ({ ...prev, quantity: undefined }));
              }}
            />
            {errors.quantity && (
              <div className="text-sm text-red-500 mt-1">{errors.quantity}</div>
            )}
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
                setErrors((prev) => ({ ...prev, dueDate: undefined }));
              }}
            />
            {errors.dueDate && (
              <div className="text-sm text-red-500 mt-1">{errors.dueDate}</div>
            )}
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
