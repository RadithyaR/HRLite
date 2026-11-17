import { useEffect, useMemo, useState } from "react";
import { useEmployeeStore } from "../store/useEmployeeStore";
import EmployeeTable from "./EmployeeTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import EmployeeFormDialog from "./EmployeeFormDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Index() {
  const listEmployee = useEmployeeStore((state) => state.listEmployee);
  const selectedDepartment = useEmployeeStore(
    (state) => state.selectedDepartment,
  );
  const isLoading = useEmployeeStore((state) => state.isLoading);
  const hasError = useEmployeeStore((state) => state.hasError);
  const page = useEmployeeStore((state) => state.page);
  const total = useEmployeeStore((state) => state.total);
  const onSetPage = useEmployeeStore((state) => state.onSetPage);
  const totalPages = Math.ceil(total / 10);
  const [searchInput, setSearchInput] = useState("");
  const debouncedKeyword = useDebounce(searchInput, 500);
  const keyword = useEmployeeStore((state) => state.keyword);
  const onSetKeyword = useEmployeeStore((state) => state.onSetKeyword);
  const onOpenForm = useEmployeeStore((state) => state.onOpenForm);
  const onSetSelectedDepartment = useEmployeeStore(
    (state) => state.onSetSelectedDepartment,
  );
  const isFormOpen = useEmployeeStore((state) => state.isFormOpen);

  useEffect(() => {
    onSetKeyword(debouncedKeyword);
  }, [debouncedKeyword, onSetKeyword]);

  const onGetListEmployee = useEmployeeStore(
    (state) => state.onGetListEmployee,
  );

  useEffect(() => {
    onGetListEmployee();
  }, [page, keyword, onGetListEmployee]);

  const listFilteredEmployee = useMemo(() => {
    if (selectedDepartment === "all") {
      return listEmployee;
    }

    return listEmployee.filter(
      (employee) => employee.company?.department === selectedDepartment,
    );
  }, [listEmployee, selectedDepartment]);

  const listDepartment = useMemo(() => {
    return [
      ...new Set(
        listEmployee
          .map((employee) => employee.company?.department)
          .filter(Boolean),
      ),
    ];
  }, [listEmployee]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daftar Karyawan</h1>

        <Button onClick={() => onOpenForm()} variant="outline">
          Tambah Karyawan
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <Input
          type="search"
          placeholder="Cari karyawan..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="max-w-sm"
        />

        <Select
          value={selectedDepartment}
          onValueChange={onSetSelectedDepartment}
        >
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Filter departemen" />
          </SelectTrigger>

          <SelectContent className="z-50 bg-white text-gray-900">
            <SelectItem value="all">Semua Departemen</SelectItem>

            {listDepartment.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isFormOpen && <EmployeeFormDialog />}

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-full" />
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      ) : hasError ? (
        <div className="flex flex-col items-center gap-4 py-12">
          <p className="text-red-500">Gagal memuat data karyawan.</p>
          <Button onClick={onGetListEmployee}>Coba Lagi</Button>
        </div>
      ) : listFilteredEmployee.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <h2 className="text-lg font-semibold">Tidak ada karyawan</h2>
          <p className="text-sm text-muted-foreground">
            Data karyawan tidak ditemukan.
          </p>
        </div>
      ) : (
        <>
          <EmployeeTable listEmployee={listFilteredEmployee} />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Halaman {page} dari {totalPages}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => onSetPage(page - 1)}
              >
                Sebelumnya
              </Button>

              <Button
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => onSetPage(page + 1)}
              >
                Selanjutnya
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Index;
