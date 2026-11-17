import { BASE_URL } from "@/config";

export const getDashboardEmployeesApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users?limit=0`);
    if (!response.ok) {
      throw new Error("Gagal mengambil data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal mendapatkan data: ", error.message);
    throw error;
  }
};
