import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useEmployeeStore } from "../store/useEmployeeStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DeleteEmployeeDialog from "./DeleteEmployeeDialog";

function EmployeeTable({ listEmployee }) {
  const [deleteEmployee, setDeleteEmployee] = useState(null);
  const onOpenForm = useEmployeeStore((state) => state.onOpenForm);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Foto</TableHead>
            <TableHead>Nama Lengkap</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Departemen</TableHead>
            <TableHead>Jabatan</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {listEmployee.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <img
                  src={employee.image}
                  alt={employee.firstName}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </TableCell>
              <TableCell>
                {employee.firstName} {employee.lastName}
              </TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.company?.department ?? "-"}</TableCell>
              <TableCell>{employee.company?.title ?? "-"}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/employee/${employee.id}`}
                    className="inline-flex h-8 items-center rounded-md border px-3 text-sm hover:bg-muted"
                  >
                    Detail
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenForm(employee)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-600"
                    size="sm"
                    onClick={() => setDeleteEmployee(employee)}
                  >
                    Hapus
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteEmployeeDialog
        open={deleteEmployee !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteEmployee(null);
        }}
        employee={deleteEmployee}
      />
    </>
  );
}

export default EmployeeTable;
