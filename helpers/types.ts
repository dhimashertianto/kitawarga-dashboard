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
  fee_kitawarga: string;
  fee_biaya_pembayaran: string;
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

export type ListOtherType = {
  id_perumahan: string;
  nama_perumahan: string;
  bulan: string;
  data: ListOtherTypeData[];
};

export type ListOtherTypeData = {
  id_pengeluaran_bulanan: string;
  nama_transaksi_pengeluaran_bulanan: string;
  id_kategori: string;
  kategori_transaksi: string;
  tanggal_transaksi_pengeluaran_bulanan: string;
  nilai_transaksi_pengeluaran_bulanan: string;
  keterangan_pengeluaran_bulanan: string;
  bukti_foto_pengeluaran_bulanan: string;
  id_perumahan: string;
  createdAt: string;
  updatedAt: string;
  nama_kategori_transaksi: string;
  keterangan_kategori_transaksi: string;
  nama_perumahan: string;
  alamat_perumahan: string;
  link_cctv: string;
  link_img_qr: string;
  saldo_perumahan: string;
  alamat_maps: string;
  bank_code: string;
  account_holder_name: string;
  account_number: string;
  status_account: string;
  expired_sub: string;
  skema_bayar: string;
};

export type ListCategoryType = {
  id_kategori: string;
  nama_kategori_transaksi: string;
  keterangan_kategori_transaksi: string;
  createdAt: string;
  updatedAt: string;
};

export type ListWargaType = {
  id_warga: string;
  nama_warga: string;
  blok_rumah: string;
  nomor_rumah: string;
  email: string;
  nomor_hp: string;
  is_rw: boolean;
  is_rt: boolean;
  id_rw: string;
  id_rt: string;
  id_perumahan: string;
  status_pernikahan: string;
  jenis_kelamin: string;
  biaya_ipl: string;
  createdAt: string;
  updatedAt: string;
  password_warga: string;
  fcm_token: string;
  biaya_penambahan: string;
  nama_perumahan: string;
  alamat_perumahan: string;
  link_cctv: string;
  link_img_qr: string;
  saldo_perumahan: string;
  alamat_maps: string;
  bank_code: string;
  account_holder_name: string;
  account_number: string;
  status_account: string;
  expired_sub?: string;
  skema_bayar: string;
};

export type DataKaryawanType = {
  id_karyawan: string;
  nama_karyawan: string;
  posisi: string;
  sisa_kasbon: string;
  id_perumahan: string;
  gaji_bulanan: string;
  createdAt: string;
  updatedAt: string;
};

export type DataRwType = {
  id_rw: string;
  nomor_rw: string;
  id_perumahan: string;
  createdAt: string;
  updatedAt: string;
};

export type DataRtType = {
  id_rt: string;
  id_rw: string;
  nomor_rt: string;
  id_perumahan: string;
  createdAt: string;
  updatedAt: string;
  nomor_rw: string;
};

export type DataDashboardType = {
  total_saldo: string;
  total_pemasukan_bulan_ini: string;
  total_pengeluaran_bulan_ini: string;
  selisih: string;
  saldo_pengurus: string;
  saldo_xendit: string;
}