const BASE_URL = "https://kitawarga.com/api";

// Endpoints

const Login = "/api/auth/signin";
const GetBulan = "/api/admin/list/bulan";
const DetailWarga = "/api/admin/profil/warga";
const Payment = "/api/admin/invoice/generate";
const ListPayment = "/api/admin/list/pemasukan_user_invoice";

const Listperumahan = "/api/admin/list/perumahan";

export {
  BASE_URL,
  Login,
  GetBulan,
  DetailWarga,
  Payment,
  ListPayment,
  Listperumahan,
};
