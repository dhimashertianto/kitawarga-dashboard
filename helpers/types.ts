// FORMS

export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type DetailPerumahanType = {
  id_perumahan: string;
  nama_perumahan: string;
  alamat_perumahan: string;
  link_cctv: string;
  link_img_qr: string;
  saldo_perumahan: string;
  alamat_maps: string;
  createdAt: string;
  upstringdAt: string;
  bank_code: string;
  account_holder_name: string;
  account_number: string;
  status_account?: string;
  expired_sub?: string;
};
