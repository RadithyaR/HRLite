import {
  createEmployeeApi,
  deleteEmployeeApi,
  getEmployeeDetailApi,
  getListEmployeesApi,
  updateEmployeeApi,
} from "@/features/employee/api/employeeApi";

// list employee
// const testAPI = async () => {
//   try {
//     const data = await getListEmployeesApi(1, 0);

//     console.log("Total Karyawan: ", data.total);
//     console.log("Jumlah Data: ", data.users.length);
//     console.log("Data Karyawan: ", data.users);
//   } catch (error) {
//     console.error("Gagal mendapatkan data karyawan: ", error.message);
//   }
// };

//employee detail
const testGetDetailAPI = async () => {
  try {
    const employee = await getEmployeeDetailApi(2);

    console.log("id:", employee.id);
    console.log("Nama:", employee.firstName, employee.lastName);
    console.log("Email:", employee.email);
    console.log("Departemen:", employee.company.department);
  } catch (error) {
    console.error("Gagal mendapatkan data karyawan: ", error.message);
  }
};

//create employee
// const payload = {
//   firstName: "Budi",
//   lastName: "Santoso",
//   age: 25,
//   email: "budi@example.com",
//   company: {
//     department: "Engineering",
//     title: "Frontend Developer",
//   },
// };
// const testAPI = async () => {
//   try {
//     const employee = await createEmployeeApi(payload);

//     console.log("Karyawan baru:", employee);
//     console.log("ID karyawan:", employee.id);
//   } catch (error) {
//     console.error("Gagal menambahkan data karyawan: ", error.message);
//   }
// };

//update api
// const payload = {
//   firstName: "Akmal",
// };
// const testAPI = async () => {
//   try {
//     const employee = await updateEmployeeApi(2, payload);
//     console.log(employee);
//   } catch (error) {
//     console.error("Gagal update data karyawan: ", error.message);
//   }
// };

//Delete data
// const testAPI = async () => {
//   try {
//     const employee = await deleteEmployeeApi(2);
//     console.log(employee);
//   } catch (error) {
//     console.error("Gagal update data karyawan: ", error.message);
//   }
// };

testGetDetailAPI();
// testAPI();
