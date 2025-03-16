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

const ListKaryawan = "/api/admin/list/karyawan";
const AddKaryawan = "/api/admin/insert/karyawan";
const EditKaryawan = "/api/admin/update/karyawan";
const DeleteKaryawan = "/api/admin/delete/karyawan";

const ListRw = "/api/admin/list/rw";
const AddRw = "/api/admin/insert/rw";
const EditRw = "/api/admin/update/rw";
const DeleteRw = "/api/admin/delete/rw";

const ListRt = "/api/admin/list/rt";
const AddRt = "/api/admin/insert/rt";
const EditRt = "/api/admin/update/rt";
const DeleteRt = "/api/admin/delete/rt";

const BiayaPenambahan = '/api/warga/findPenambahanBiaya';
const DiskonWarga = '/api/diskon/findAllByPerumahanAndTahunAndIdWarga';
const IplPerumahanAndTahun = '/api/ipl/findAllByPerumahanAndTahun';

const WargaConst = 'warga';
const AdminConst = '2c452346-3429-11ee-be56-0242ac120002';
const SuperAdminConst = '529a4642-575a-438e-91ca-c6f744ed0554';

const DashboardURL = '/api/admin/mock/data';
const UploadWarga ='/api/warga/uploadExcel';
const AddPerumahanUrl ='/api/admin/insert/perumahan';

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
  ListKaryawan,
  AddKaryawan,
  EditKaryawan,
  DeleteKaryawan,
  ListRw,
  AddRw,
  EditRw,
  DeleteRw,
  ListRt,
  AddRt,
  EditRt,
  DeleteRt,
  BiayaPenambahan,
  DiskonWarga,
  IplPerumahanAndTahun,
  WargaConst,
  AdminConst,
  SuperAdminConst,
  DashboardURL,
  UploadWarga,
  AddPerumahanUrl
};
