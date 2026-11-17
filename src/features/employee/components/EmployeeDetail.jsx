import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEmployeeStore } from "../store/useEmployeeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function EmployeeDetail() {
  const { id } = useParams();

  const selectedEmployee = useEmployeeStore((state) => state.selectedEmployee);
  const isLoading = useEmployeeStore((state) => state.isLoading);
  const hasError = useEmployeeStore((state) => state.hasError);

  const onGetEmployeeDetail = useEmployeeStore(
    (state) => state.onGetEmployeeDetail,
  );

  useEffect(() => {
    onGetEmployeeDetail(id);
  }, [id, onGetEmployeeDetail]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-red-500">Gagal memuat detail karyawan.</p>
        <Button onClick={() => onGetEmployeeDetail(id)}>Coba Lagi</Button>
      </div>
    );
  }

  if (!selectedEmployee) {
    return <p>Data karyawan tidak ditemukan.</p>;
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex items-center gap-6">
          <img
            src={selectedEmployee.image}
            alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
            className="h-24 w-24 rounded-full object-cover"
          />

          <div>
            <h1 className="text-2xl font-bold">
              {selectedEmployee.firstName} {selectedEmployee.lastName}
            </h1>

            <p className="text-muted-foreground">{selectedEmployee.email}</p>

            <p>{selectedEmployee.company?.title ?? "-"}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Informasi Pribadi</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="font-bold">Usia: {selectedEmployee.age ?? "-"}</p>

            <p className="font-bold">
              Telepon: {selectedEmployee.phone ?? "-"}
            </p>

            <p className="font-bold">
              Tanggal Lahir: {selectedEmployee.birthDate ?? "-"}
            </p>

            <p className="font-bold">
              Alamat: {selectedEmployee.address?.address ?? "-"}
            </p>

            <p className="font-bold">
              Kota: {selectedEmployee.address?.city ?? "-"}
            </p>

            <p className="font-bold">
              Provinsi/Negara Bagian: {selectedEmployee.address?.state ?? "-"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-bold">Informasi Pekerjaan</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <p className="font-bold">
              Perusahaan: {selectedEmployee.company?.name ?? "-"}
            </p>

            <p className="font-bold">
              Departemen: {selectedEmployee.company?.department ?? "-"}
            </p>

            <p className="font-bold">
              Jabatan: {selectedEmployee.company?.title ?? "-"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default EmployeeDetail;
