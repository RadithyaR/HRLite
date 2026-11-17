import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEmployeeStore } from "../store/useEmployeeStore";
import { toast } from "sonner";

function DeleteEmployeeDialog({ open, onOpenChange, employee }) {
  const onDeleteEmployee = useEmployeeStore((state) => state.onDeleteEmployee);

  const handleDelete = async () => {
    if (!employee) return;

    try {
      await onDeleteEmployee(employee.id);

      toast.success("Karyawan berhasil dihapus");
      onOpenChange(false);
    } catch {
      toast.error("Gagal menghapus karyawan");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white text-gray-900">
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Karyawan?</AlertDialogTitle>

          <AlertDialogDescription>
            Apakah kamu yakin ingin menghapus{" "}
            <strong>
              {employee?.firstName} {employee?.lastName}
            </strong>
            ? Tindakan ini akan menghapus karyawan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteEmployeeDialog;
