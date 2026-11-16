import { BASE_URL } from "@/config";

export const getListEmployeesApi = async (limit, skip) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users?limit=${limit}&skip=${skip}`,
    );
    if (!response.ok) {
      throw new Error("Tidak ada karyawan yang ditemukan");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal mendapatkan data:", error.message);
    throw error;
  }
};

export const getEmployeeDetailApi = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error("Tidak ada karyawan yang ditemukan");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Gagal mendapatkan data:", error.message);
    throw error;
  }
};

export const searchEmployeeApi = async (keyword, limit, skip) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/search?q=${encodeURIComponent(keyword)}&limit=${limit}&skip=${skip}`,
    );
    if (!response.ok) {
      throw new Error("Gagal mencari karyawan");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal mencari data:", error.message);
    throw error;
  }
};

export const createEmployeeApi = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Gagal menambahkan data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal menambahkan data:", error.message);
    throw error;
  }
};

export const updateEmployeeApi = async (id, payload) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Gagal update data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal update data:", error.message);
    throw error;
  }
};

export const deleteEmployeeApi = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("gagal menghapus data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal hapus data:", error.message);
    throw error;
  }
};
