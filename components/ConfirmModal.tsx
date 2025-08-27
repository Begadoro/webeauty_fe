import { Button } from "~/components/ui/button";
import { P } from "~/components/ui/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export function ConfirmModal({
  open,
  close,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
}: {
  open: boolean;
  close: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-2">
          <Button className="flex-1 bg-purplePrimary" onPress={onConfirm}>
            <P className="text-white font-bold">{confirmText}</P>
          </Button>
          <Button variant="outline" className="flex-1" onPress={close}>
            <P className="font-bold">{cancelText}</P>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
