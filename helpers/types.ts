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
