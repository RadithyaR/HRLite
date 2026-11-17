import React, { useEffect, useState } from "react";
import { useEmployeeStore } from "../store/useEmployeeStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import * as yup from "yup";

const employeeSchema = yup
  .object({
    firstName: yup.string().trim(),
    lastName: yup.string().trim(),

    email: yup
      .string()
      .trim()
      .required("Email wajib diisi")
      .email("Format email tidak valid"),

    age: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      )
      .required("Usia wajib diisi")
      .integer("Usia harus berupa bilangan bulat")
      .min(18, "Usia minimal 18 tahun")
      .max(65, "Usia maksimal 65 tahun"),

    department: yup.string().required("Departemen wajib dipilih"),
  })
  .test(
    "full-name",
    "Nama lengkap wajib memiliki minimal 3 karakter",
    function (values) {
      const fullName =
        `${values.firstName ?? ""} ${values.lastName ?? ""}`.trim();

      if (fullName.length < 3) {
        return this.createError({
          path: "firstName",
          message: "Nama lengkap wajib memiliki minimal 3 karakter",
        });
      }

      return true;
    },
  );

function EmployeeFormDialog() {
  const isFormOpen = useEmployeeStore((state) => state.isFormOpen);
  const onCloseForm = useEmployeeStore((state) => state.onCloseForm);
  const editingEmployee = useEmployeeStore((state) => state.editingEmployee);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [departmentError, setDepartmentError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setNameError("");
    setEmailError("");
    setAgeError("");
    setDepartmentError("");

    try {
      const validatedData = await employeeSchema.validate(
        {
          firstName,
          lastName,
          email,
          age,
          department,
        },
        { abortEarly: false },
      );

      const payload = {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        age: validatedData.age,
        company: {
          ...editingEmployee?.company,
          department: validatedData.department,
        },
      };

      if (editingEmployee) {
        await onUpdateEmployee(editingEmployee.id, payload);
      } else {
        await onCreateEmployee(payload);
      }

      onCloseForm();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((validationError) => {
          switch (validationError.path) {
            case "firstName":
              setNameError(validationError.message);
              break;
            case "email":
              setEmailError(validationError.message);
              break;
            case "age":
              setAgeError(validationError.message);
              break;
            case "department":
              setDepartmentError(validationError.message);
              break;
          }
        });
      } else {
        console.error("Gagal menyimpan karyawan:", error.message);
      }
    }
  };

  useEffect(() => {
    setNameError("");
    setEmailError("");
    setAgeError("");
    setDepartmentError("");
    if (editingEmployee) {
      setFirstName(editingEmployee.firstName ?? "");
      setLastName(editingEmployee.lastName ?? "");
      setEmail(editingEmployee.email ?? "");
      setAge(editingEmployee.age?.toString() ?? "");
      setDepartment(editingEmployee.company?.department ?? "");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setAge("");
      setDepartment("");
    }
  }, [editingEmployee, isFormOpen]);

  const onCreateEmployee = useEmployeeStore((state) => state.onCreateEmployee);

  const onUpdateEmployee = useEmployeeStore((state) => state.onUpdateEmployee);

  return (
    <Dialog
      open={isFormOpen}
      onOpenChange={(open) => {
        if (!open) onCloseForm();
      }}
    >
      <DialogContent className="bg-white text-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editingEmployee ? "Ubah data Karyawan" : "Tambah data karyawan"}
          </DialogTitle>
          <DialogDescription>
            {editingEmployee
              ? "Perbarui informasi karyawan"
              : "Isi informasi karyawan baru"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nama Depan</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                placeholder="Masukkan Nama Depan"
              />
              {nameError && (
                <p className="text-sm text-destructive text-red-400">
                  {nameError}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nama Belakang</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                placeholder="Masukkan Nama Belakang"
              />
              {nameError && (
                <p className="text-sm text-destructive text-red-400">
                  {nameError}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                placeholder="Masukkan Email"
              />
              {emailError && (
                <p className="text-sm text-destructive text-red-400">
                  {emailError}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Usia</Label>
              <Input
                id="age"
                type="number"
                min="18"
                max="65"
                value={age}
                onChange={(event) => {
                  setAge(event.target.value);
                }}
                placeholder="Masukkan Usia"
              />
              {ageError && (
                <p className="text-sm text-destructive text-red-400">
                  {ageError}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Departemen</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger id="department" className="w-full">
                  <SelectValue placeholder="Pilih Departement" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Research and Development">
                    Research and Development
                  </SelectItem>
                  <SelectItem value="Human Resources">
                    Human Resources
                  </SelectItem>
                  <SelectItem value="Product Management">
                    Product Management
                  </SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Accounting">Accounting</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="Training">Training</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Business Development">
                    Business Development
                  </SelectItem>
                </SelectContent>
              </Select>
              {departmentError && (
                <p className="text-sm text-destructive text-red-400">
                  {departmentError}
                </p>
              )}
            </div>
            <Button type="submit">Simpan</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeFormDialog;
