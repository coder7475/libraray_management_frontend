import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  bookTitle: string;
}

export default function DeleteConfirmModal({ open, onClose, onConfirm, isLoading, bookTitle }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>Delete Book</DialogTitle>
        
            <DialogDescription>
                Are you sure you want to delete <strong>{bookTitle}</strong>?
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>          
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Delete
            </Button>        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
