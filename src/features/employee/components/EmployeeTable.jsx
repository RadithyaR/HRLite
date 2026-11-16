import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

function EmployeeTable({ listEmployee }) {
  return (
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
              <Link
                to={`/employee/${employee.id}`}
                className="inline-flex h-8 items-center rounded-md border px-3 text-sm hover:bg-muted"
              >
                Detail
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default EmployeeTable;
