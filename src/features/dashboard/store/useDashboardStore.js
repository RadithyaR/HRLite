import { create } from "zustand";
import { getDashboardEmployeesApi } from "../api/dashboardApi";

export const useDashboardStore = create((set) => ({
  listEmployee: [],
  isLoading: false,
  hasError: false,

  onGetDashboardData: async () => {
    set({ isLoading: true, hasError: false });

    try {
      const data = await getDashboardEmployeesApi();

      set({ listEmployee: data.users });
    } catch {
      set({ hasError: true });
    } finally {
      set({ isLoading: false });
    }
  },
}));
