"use client";
import {
  BiayaPenambahan,
  DetailWarga,
  DiskonWarga,
  GetBulan,
  IplPerumahanAndTahun,
  ListPayment,
  Payment as PaymentURL,
} from "@/constants/constants";
import api from "@/services/services";
import { Form } from "@heroui/form";
import { Alert, Checkbox, Select, SelectItem, Spinner } from "@heroui/react";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import { FormEvent, useEffect, useState } from "react";
import { TableWrapper } from "./table/table";

type Years = {
  key: string;
  label: string;
};

type Months = {
  nama: string;
  value: boolean;
};

type InitialProfile = {
  nama: string;
  namaPerumahan: string;
  biayaIpl: string;
};

export type PaymentList = {
  nama_pembayar: string;
  amount: string;
  bulan: string;
  payment_method: string;
  status: string;
  tanggal_transaksi: string;
  id_transaksi: string;
  id: number;
  tahun: string;
  fee_kitawarga: string;
  fee_biaya_pembayaran: string;
};

export const Payment = () => {
  const [errors, setErrors] = useState({});
  const [selectedMonths, setSelectedMonths] = useState<Months[]>([]);
  const [years, setYears] = useState<Years[]>([]);
  const [selectedYears, setSelectedYears] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [months, setMonths] = useState<Months[]>([]);
  const [paymentList, setPaymentList] = useState<PaymentList[]>([]);
  const [initialProfile, setInitialProfile] = useState<InitialProfile>({
    nama: "",
    namaPerumahan: "",
    biayaIpl: "",
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [isErrorEmptyMonth, setIsErrorEmptyMonth] = useState(false);
  const [biayaPenambahan, setBiayaPenambahan] = useState<string>("");
  const [diskonWarga, setDiskonWarga] = useState<string>("");
  const [biayaIpl, setBiayaIpl] = useState<string>("");
  const [statikFee, setStatikFee] = useState<number>(0);
  const [presentaseFee, setPresentaseFee] = useState<number>(0);
  const [totalPembayaran, setTotalPembayaran] = useState<number>(0);

  const renderError = (title: string) => {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col w-full">
          <div key="danger" className="w-full flex items-center my-3">
            <Alert color={"danger"} title={title} />
          </div>
        </div>
      </div>
    );
  };


  const getBiayaPenambahan = async () => {
    try {
      setLoadingList(true);
      const id_warga = Cookies.get("id_warga");
      const res = await api.post(BiayaPenambahan, {
        id_warga: id_warga,
      });


      if (res.status !== 200) {
        setLoadingList(false);
        setIsError(true);
        return;
      }

      setLoadingList(false);
      const data = res.data.data;

      setBiayaPenambahan(data.biaya_penambahan);

    } catch (error) {
      setLoadingList(false);
      setIsError(true);
    }
  };

  const getDiskonWarga = async (tahun: string) => {
    try {
      setLoadingList(true);
      const id_warga = Cookies.get("id_warga");
      const id_perumahan = Cookies.get("id_perumahan");
      const res = await api.post(DiskonWarga, {
        id_warga: id_warga,
        id_perumahan: id_perumahan,
        tahun: tahun
      });

      if (res.status !== 200) {
        setLoadingList(false);
        setIsError(true);
        return;
      }

      setLoadingList(false);
      const data = res.data.data;
      setDiskonWarga(data?.diskon ?? "0");

    } catch (error) {
      setLoadingList(false);
      setIsError(true);
    }

  };

  const getIPLPerumahan = async (tahun: string) => {
    try {
      setLoadingList(true);
      const id_perumahan = Cookies.get("id_perumahan");
      const res = await api.post(IplPerumahanAndTahun, {
        id_perumahan: id_perumahan,
        tahun: tahun
      });

      if (res.status !== 200) {
        setLoadingList(false);
        setIsError(true);
        return;
      }

      setLoadingList(false);
      const data = res.data.data[0];
      setBiayaIpl(data.ipl);
      setStatikFee(data.statik_fee);
      setPresentaseFee(data.presentase_fee);

    } catch (error) {
      setLoadingList(false);
      setIsError(true);
    }

  };

  const getListPayment = async () => {
    try {
      setLoadingList(true);
      const id_warga = Cookies.get("id_warga");
      const id_perumahan = Cookies.get("id_perumahan");
      const res = await api.post(ListPayment, {
        id_warga: id_warga,
        id_perumahan: id_perumahan,
      });

      if (res.status !== 200) {
        setLoadingList(false);
        setIsError(true);
        return;
      }

      const data = res.data.data;

      setLoadingList(false);

      console.log(data);


      const paymentListData: PaymentList[] = data.map((item: any) => {
        return {
          nama_pembayar: item.nama_pembayar,
          amount: item.amount,
          bulan: item.bulan,
          payment_method: item.payment_method,
          status: item.status,
          tanggal_transaksi: item.tanggal_transaksi,
          id_transaksi: item.id_transaksi,
          id: paymentList.length + 1,
          tahun: item.tahun,
          fee_kitawarga: item.fee_kitawarga,
          fee_biaya_pembayaran: item.fee_biaya_pembayaran
        };
      });
      setPaymentList(paymentListData);
    } catch (error) {
      setLoadingList(false);
      setIsError(true);
    }
  };

  const getDetailWarga = async () => {
    try {
      setLoadingProfile(true);
      const id_warga = Cookies.get("id_warga");
      const id_perumahan = Cookies.get("id_perumahan");
      const res = await api.post(DetailWarga, {
        id_warga: id_warga,
        id_perumahan: id_perumahan,
      });

      if (res.status !== 200) {
        setLoadingProfile(false);
        setIsError(true);
        return;
      }

      const data = res.data.data[0];

      const values: InitialProfile = {
        nama: data.nama_warga,
        namaPerumahan: data.nama_perumahan,
        biayaIpl: data.biaya_ipl,
      };

      setLoadingProfile(false);
      setInitialProfile(values);
    } catch (error) {
      setLoadingProfile(false);
      setIsError(true);
    }
  };

  const getBulan = async () => {
    try {
      setLoading(true);
      const id_warga = Cookies.get("id_warga");
      const res = await api.post(GetBulan, {
        tahun: selectedYears,
        id_warga: id_warga,
      });

      if (res.status !== 200) {
        setLoading(false);
        setIsError(true);
        return;
      }

      const data = res.data;

      setLoading(false);
      setSelectedMonths([]);
      setMonths(data.data);
    } catch (error) {
      setLoading(false);
      setIsError(true);
    }
  };

  const mapTahunBerjalan = () => {
    const currentYear = new Date().getFullYear() + 1;
    const tahun = Array.from({ length: 3 }, (_, i) => {
      const year = currentYear - i;
      return { key: year.toString(), label: year.toString() };
    });

    setYears(tahun);
  };

  useEffect(() => {
    mapTahunBerjalan();
    getDetailWarga();
    getListPayment();
    getIPLPerumahan(selectedYears);
  }, []);

  useEffect(() => {
    getBulan();
    getBiayaPenambahan();
    getDiskonWarga(selectedYears);
  }, [selectedYears]);

  useEffect(() => {
    if (isError || isErrorEmptyMonth) {
      setTimeout(() => {
        setIsError(false);
        setIsErrorEmptyMonth(false);
      }, 2000);
    }
  }, [isError, isErrorEmptyMonth]);

  const toggleMonth = (nama: string) => {
    setSelectedMonths((prev) =>
      prev.some((m) => m.nama === nama)
        ? prev.filter((m) => m.nama !== nama)
        : [...prev, { nama, value: true } as Months]
    );
  };


  useEffect(() => {
    setTotalPembayaran(
      selectedMonths.length === 0 ?
        0 * (Number(biayaIpl) + Number(biayaPenambahan) - Number(diskonWarga)) :
        selectedMonths.length * (Number(biayaIpl) + Number(biayaPenambahan) - Number(diskonWarga))
    )
  }, [selectedMonths])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (selectedMonths.length === 0) {
        setIsErrorEmptyMonth(true);
        return;
      }

      setLoadingPayment(true);

      const id_warga = Cookies.get("id_warga");
      const id_perumahan = Cookies.get("id_perumahan");
      const biaya_ipl = Cookies.get("biaya_ipl");

      const res = await api.post(PaymentURL, {
        id_warga: id_warga,
        id_perumahan: id_perumahan,
        isMultiMonth: selectedMonths.length > 1 ? true : false,
        description: "Pemayaran IPL bulanan",
        list_bulan: selectedMonths,
        amountList: String(Number(biaya_ipl) * selectedMonths.length),
        tahun: selectedYears,
        type_payment: "1",
      });

      if (res.status !== 200) {
        setIsError(true);
        setLoadingPayment(false);
        return;
      }

      setLoadingPayment(false);

      window.open(res.data.data.invoice_url, "_blank");
    } catch (error) {
      setIsError(true);
      setLoadingPayment(false);
    }
  };

  return (
    <div className="h-full lg:px-6">
      <div className="flex flex-col justify-center items-center gap-4 pt-3 px-4 lg:px-0 max-w-[60rem] mx-auto w-full">
        <div className="flex flex-col w-full gap-2">
          {isError &&
            renderError(
              "Terjadi kesalahan sistem, silahkan coba beberapa saat lagi."
            )}
          {isErrorEmptyMonth &&
            renderError("Silahkan Pilih Tahun dan Bulan yang akan dibayarkan.")}
          <div className="flex justify-start gap-1 w-full">
            <div className="flex flex-col gap-1 items-start justify-center">
              <h5 className="text-small tracking-tight text-default-400">
                Nama :
              </h5>
              {loadingProfile ? (
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                </Skeleton>
              ) : (
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {initialProfile.nama}
                </h4>
              )}
            </div>
          </div>
          <div className="flex justify-start gap-1 w-full">
            <div className="flex flex-col gap-1 items-start justify-center">
              <h5 className="text-small tracking-tight text-default-400">
                Nama Perumahan :
              </h5>
              {loadingProfile ? (
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                </Skeleton>
              ) : (
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {initialProfile.namaPerumahan}
                </h4>
              )}
            </div>
          </div>
          <div className="flex justify-start gap-1 w-full">
            <div className="flex flex-col gap-1 items-start justify-center">
              <h5 className="text-small tracking-tight text-default-400">
                Biaya IPL :
              </h5>

              {loadingProfile ? (
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                </Skeleton>
              ) : (
                <h4 className="text-small font-semibold leading-none text-default-600">{`Rp.${biayaIpl}`}</h4>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[60rem] mx-auto w-full mt-8">
        <Form
          className="w-full gap-3"
          validationErrors={errors}
          onSubmit={onSubmit}
        >
          <Select
            className="w-full"
            items={years}
            label="Pilih Tahun Pembayaran"
            placeholder={selectedYears}
            onChange={(e) => setSelectedYears(e.target.value)}
          >
            {(tahun) => <SelectItem>{tahun.label}</SelectItem>}
          </Select>

          <div className="space-y-2 mt-4">
            <h3 className="text-[14px] font-[500]">Pilih Bulan Pembayaran</h3>
            {loading ? (
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-5 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
            ) : (
              months.map((month) => (
                <label
                  key={month.nama}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    name={month.nama}
                    checked={selectedMonths.includes(
                      month.nama as unknown as Months
                    )}
                    onChange={() => toggleMonth(month.nama)}
                  />
                  <span className="text-small font-semibold leading-none text-default-600">
                    {month.nama}
                  </span>
                </label>
              ))
            )}
          </div>

          <div className="flex justify-start gap-1 mt-4 w-full">
            <div className="flex flex-col gap-1 items-start justify-center">

              <h4 className="text-small font-semibold leading-none text-default-600">
                Rincian Biaya:
              </h4>

              {loadingList ? (
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                </Skeleton>
              ) : (
                <>
                  <h5 className="text-small tracking-tight text-default-400">
                    {`Biaya IPL : Rp.${biayaIpl}`}
                  </h5>
                  {Number(biayaPenambahan) > 0 && <h5 className="text-small tracking-tight text-success-400">
                    {`Biaya Tambahan : + Rp.${Number(biayaPenambahan) * selectedMonths.length}`}
                  </h5>}
                  {Number(diskonWarga) > 0 && <h5 className="text-small tracking-tight text-default-400">
                    {`Diskon Pembayaran : - Rp.${Number(diskonWarga) * selectedMonths.length}`}
                  </h5>}
                  <h5 className="text-small tracking-tight text-default-400">
                    {`Biaya Qris : Rp.${Math.ceil((0.7 / 100) * (Number(totalPembayaran) + Number(statikFee) * selectedMonths.length))}`}
                  </h5>
                  <h5 className="text-small tracking-tight text-default-400">
                    {`Biaya Platform : Rp.${statikFee * selectedMonths.length}`}
                  </h5>
                </>
              )}
              <h4 className="text-small font-semibold leading-none mt-2 text-default-600">
                Total Pembayaran:
              </h4>
              {loadingList ? (
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                </Skeleton>
              ) : (
                <h5 className="text-default-600 tracking-tight text-primary-400">
                  {`Rp.${Math.ceil(((0.7 / 100) * (Number(totalPembayaran) + Number(statikFee) * selectedMonths.length)) + totalPembayaran + (Number(statikFee) * selectedMonths.length))}`}
                </h5>
              )}
            </div>
          </div>


          <Button
            type="submit"
            color="primary"
            variant="flat"
            className="w-full mt-4"
          >
            {loadingPayment ? (
              <Spinner size="sm" color="primary" />
            ) : (
              "Bayar Sekarang"
            )}
          </Button>
          <Button type="reset" color="danger" variant="flat" className="w-full">
            Batal
          </Button>
        </Form>
      </div>
      <div className="max-w-[60rem] mx-auto w-full mt-8 px-4 lg:px-0">
        <h3 className="text-[14px] font-[500] mb-2">Riwayat Pembayaran</h3>
        {loadingList ? (
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-5 w-3/5 rounded-lg bg-default-200" />
          </Skeleton>
        ) : (
          <TableWrapper data={paymentList} />
        )}
      </div>
    </div>
  );
};
