# HRLite — Aplikasi Manajemen Karyawan

## Menjalankan Proyek Secara Lokal

Bun telah terpasang pada perangkat.

1. Clone repository ini dan masuk ke direktori proyek:

2. Instal dependensi:

   ```bash
   bun install
   ```

3. Jalankan development server:

   ```bash
   bun dev
   ```

4. Buka alamat localhost yang ditampilkan Vite pada terminal (umumnya `http://localhost:5173`).

## Fitur

- **Daftar karyawan** dengan foto, nama lengkap, email, departemen, jabatan, dan aksi.
- **Pagination** 10 karyawan per halaman.
- **Pencarian**.
- **Detail karyawan** untuk melihat informasi karyawan.
- **Tambah dan ubah karyawan**.
- **Validasi form**.
- **Notifikasi**.
- **Hapus karyawan**.
- **Filter departemen**.
- **Dashboard** dengan total karyawan, jumlah departemen, rata-rata usia, dan grafik jumlah karyawan per departemen.

## Kendala yang Ditemui

- DummyJSON tidak menyimpan hasil CRUD secara permanen
- Data baru memperoleh ID yang tidak tersedia di DummyJSON
- Permintaan pencarian beruntun ketika pengguna mengetik
- Refresh pada route React Router di deployment Vercel mengembalikan 404

## Keputusan Desain State Management

- **Store fitur:** Digunakan untuk menyimpan state yang berkaitan dengan fitur tertentu, seperti data karyawan, pagination, filter, dan dashboard.
- **Global store:** Digunakan untuk state yang dibutuhkan oleh beberapa fitur atau komponen.
- **useState:** Digunakan untuk state lokal yang hanya diperlukan oleh satu komponen, seperti nilai input form.
  Pembagian ini dilakukan agar pengelolaan state lebih terstruktur dan tidak menyimpan semua state di satu tempat.

## Deployment

- Platform: Vercel
- URL aplikasi: https://hrlite-seven.vercel.app/

Dibuat untuk keperluan studi kasus Frontend Developer Intern
