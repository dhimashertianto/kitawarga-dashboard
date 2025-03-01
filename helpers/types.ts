// FORMS

export type LoginFormType = {
  noHp: string;
  password: string;
};

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type PerumahanResponseType = {
  message: string;
  data: DetailPerumahanType[];
};

export type DetailPerumahanType = {
  id_perumahan: string;
  nama_perumahan: string;
  alamat_perumahan: string;
  link_cctv: string | null;
  link_img_qr: string | null;
  saldo_perumahan: string;
  alamat_maps: string | null;
  createdAt: string;
  updatedAt: string;
  bank_code: string | null;
  account_holder_name: string | null;
  account_number: string | null;
  status_account: string | null;
  expired_sub: string | null;
  skema_bayar: string;
};

export type ListPemasukanType = {
  id_transaksi: string;
  id_warga: string;
  nama_pembayar: string;
  nomor_rumah: string;
  tanggal_transaksi: string;
  nilai_transaksi: string;
  createdAt: string;
  updatedAt: string;
  bulan: string;
};

export type ListGajiKaryawanType = {
  id_gaji: string;
  id_karyawan: string;
  nama_karyawan: string;
  posisi: string;
  gaji_bulanan: string;
  bulan: string;
  data: lisGajiKaryawanDataType[];
};

export type lisGajiKaryawanDataType = {
  posisi: string;
  gaji_bulanan: string;
  id_karyawan: string;
  nama_karyawan: string;
  jumlah_gaji: string;
  tanggal_gaji: string;
  id_gaji: string;
};

export type ListKasbonType = {
  id_kasbon: string;
  id_karyawan: string;
  nama_karyawan: string;
  bulan: string;
  data: ListKasbonDataType[];
};

export type ListKasbonDataType = {
  id_kasbon: string;
  tanggal_transaksi: string;
  nama_karyawan: string;
  id_karyawan: string;
  detail_transaksi: string;
  pinjaman: string;
  tenor: string;
  angsuran_per_bulan: string;
  keterangan: string;
  createdAt: Date;
  updatedAt: Date;
  posisi: string;
  sisa_kasbon: string;
  id_perumahan: string;
  gaji_bulanan: string;
};
