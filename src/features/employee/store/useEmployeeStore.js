import { create } from "zustand";
import {
  createEmployeeApi,
  deleteEmployeeApi,
  getEmployeeDetailApi,
  getListEmployeesApi,
  searchEmployeeApi,
  updateEmployeeApi,
} from "../api/employeeApi";

export const useEmployeeStore = create((set, get) => ({
  listEmployee: [],
  total: 0,
  page: 1,
  keyword: "",
  selectedDepartment: "all",
  selectedEmployee: null,
  editingEmployee: null,
  isFormOpen: false,
  isLoading: false,
  hasError: false,

  onSetPage: (page) => set({ page }),

  onSetKeyword: (keyword) => set({ keyword, page: 1 }),

  onSetSelectedDepartment: (selectedDepartment) => set({ selectedDepartment }),

  onGetListEmployee: async () => {
    set({ isLoading: true, hasError: false });

    const page = get().page;
    const keyword = get().keyword;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
      let data;
      if (keyword.trim()) {
        data = await searchEmployeeApi(keyword, limit, skip);
      } else {
        data = await getListEmployeesApi(limit, skip);
      }
      set({ listEmployee: data.users, total: data.total });
    } catch (hasError) {
      set({ hasError: true });
    } finally {
      set({ isLoading: false });
    }
  },

  onGetEmployeeDetail: async (id) => {
    set({ isLoading: true, hasError: false, selectedEmployee: null });

    try {
      const data = await getEmployeeDetailApi(id);

      set({ selectedEmployee: data });
    } catch (hasError) {
      set({ hasError: true });
    } finally {
      set({ isLoading: false });
    }
  },

  onOpenForm: (employee = null) => {
    set({ isFormOpen: true, editingEmployee: employee });
  },

  onCloseForm: () => {
    set({ isFormOpen: false, editingEmployee: null });
  },

  onCreateEmployee: async (payload) => {
    const newEmployee = await createEmployeeApi(payload);

    set((state) => ({
      listEmployee: [{ ...newEmployee, isLocal: true }, ...state.listEmployee],
      total: state.total + 1,
    }));
  },

  onUpdateEmployee: async (id, payload) => {
    const employee = get().listEmployee.find((item) => item.id === id);

    try {
      let updatedEmployee;

      if (employee?.isLocal) {
        updatedEmployee = payload;
      } else {
        updatedEmployee = await updateEmployeeApi(id, payload);
      }

      set((state) => ({
        listEmployee: state.listEmployee.map((employee) => {
          if (employee.id === id) {
            return {
              ...employee,
              ...updatedEmployee,
            };
          }

          return employee;
        }),
      }));
    } catch (error) {
      throw error;
    }
  },

  onDeleteEmployee: async (id) => {
    const previousList = get().listEmployee;
    const previousTotal = get().total;

    const employee = previousList.find((item) => item.id === id);

    if (!employee) {
      throw new Error("Karyawan tidak ditemukan");
    }

    set((state) => ({
      listEmployee: state.listEmployee.filter((employee) => employee.id !== id),
      total: state.total - 1,
    }));

    try {
      if (!employee.isLocal) {
        await deleteEmployeeApi(id);
      }
    } catch (error) {
      set({
        listEmployee: previousList,
        total: previousTotal,
      });

      throw error;
    }
  },
}));
