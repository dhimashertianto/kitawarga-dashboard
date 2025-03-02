const BASE_URL = "https://kitawarga.com/api";

// Endpoints

const Login = "/api/auth/signin";
const GetBulan = "/api/admin/list/bulan";
const DetailWarga = "/api/admin/profil/warga";
const Payment = "/api/admin/invoice/generate";
const ListPayment = "/api/admin/list/pemasukan_user_invoice";

const Listperumahan = "/api/admin/list/perumahan";
const EditPerumahan = "/api/admin/update/perumahan";
const DeletePerumahan = "/api/admin/delete/perumahan";
const ListPemasukan = "/api/admin/list/pemasukan";

const ListGajiKaryawan = "/api/admin/list/pengeluaran_gaji_new";
const ListKasbonKaryawan = "/api/admin/list/pengeluaran_kasbon_new";
const ListOtherKaryawan = "/api/admin/list/pengeluaran_webview_new";

const ListKategori = "/api/admin/list/kategori";
const AddKategori = "/api/admin/insert/kategori";
const EditKategori = "/api/admin/update/kategori";
const DeleteKategori = "/api/admin/delete/kategori";

const ListWarga = "/api/admin/list/warga";
const AddWarga = "/api/admin/insert/warga";
const EditWarga = "/api/admin/update/warga";
const DeleteWarga = "/api/admin/delete/warga";

export {
  BASE_URL,
  Login,
  GetBulan,
  DetailWarga,
  Payment,
  ListPayment,
  Listperumahan,
  EditPerumahan,
  DeletePerumahan,
  ListPemasukan,
  ListGajiKaryawan,
  ListKasbonKaryawan,
  ListOtherKaryawan,
  ListKategori,
  AddKategori,
  EditKategori,
  DeleteKategori,
  ListWarga,
  AddWarga,
  EditWarga,
  DeleteWarga,
};
