import { useEmployeeStore } from "@/features/employee/store/useEmployeeStore";

function testStore() {
  console.log("=== STATE AWAL ===");
  console.log(useEmployeeStore.getState());

  console.log("\n=== TEST 1: onOpenForm() untuk mode tambah ===");
  useEmployeeStore.getState().onOpenForm();

  let state = useEmployeeStore.getState();
  console.log("isFormOpen:", state.isFormOpen);
  console.log("editingEmployee:", state.editingEmployee);

  console.log("\n=== TEST 2: onCloseForm() ===");
  useEmployeeStore.getState().onCloseForm();

  state = useEmployeeStore.getState();
  console.log("isFormOpen:", state.isFormOpen);
  console.log("editingEmployee:", state.editingEmployee);

  console.log("\n=== TEST 3: onOpenForm(employee) untuk mode edit ===");
  const employee = {
    id: 1,
    firstName: "Budi",
    lastName: "Santoso",
    email: "budi@example.com",
  };

  useEmployeeStore.getState().onOpenForm(employee);

  state = useEmployeeStore.getState();
  console.log("isFormOpen:", state.isFormOpen);
  console.log("editingEmployee:", state.editingEmployee);

  console.log("\n=== TEST 4: onCloseForm() lagi ===");
  useEmployeeStore.getState().onCloseForm();

  state = useEmployeeStore.getState();
  console.log("isFormOpen:", state.isFormOpen);
  console.log("editingEmployee:", state.editingEmployee);
}

testStore();
