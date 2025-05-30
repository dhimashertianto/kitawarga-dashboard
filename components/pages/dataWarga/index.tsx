// accounts.tsx
"use client";
import { fetchData } from "@/actions/api";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { TableWrapper } from "@/components/pages/dataWarga/table/table";
import { ListWarga } from "@/constants/constants";
import { ListWargaType } from "@/helpers/types";
import { Alert } from "@heroui/react";
import { Button, Input } from "@nextui-org/react";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AddWargas } from "@/components/pages/dataWarga/add-warga";
import { exportToCSV } from "@/utils/exportUtils";
import { AddWargasImport } from "./add-warga-import";
export const DataWargas = () => {
  const router = useRouter();

  const [warga, setWarga] = useState<ListWargaType[]>([]);
  const [filteredWarga, setFilteredWarga] = useState<ListWargaType[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getWarga();
  }, []);

  const handleExportCSV = () => {
    exportToCSV({
      data: filteredWarga,
      filename: "Laporan Data Warga",
      headers: [
        "Nama Warga",
        "Blok Rumah",
        "Nomor Rumah",
        "Email",
        "No HP",
        "Status",
        "Jenis Kelamin",
        "Biaya IPL",
        "Biaya Penambahan",
      ],
      mapper: (item) => [
        item.nama_warga,
        item.blok_rumah,
        item.nomor_rumah,
        item.email,
        item.nomor_hp,
        item.status_pernikahan,
        item.jenis_kelamin,
        item.biaya_ipl,
        item.biaya_penambahan,
      ],
    });
  };

  const getWarga = async () => {
    try {
      const id = Cookies.get("id_perumahan");
      const response = await fetchData(ListWarga, {
        id_perumahan: id,
        param: "1",
        nama: "",
      });
      const data = response as { data: ListWargaType[] };
      setWarga(data.data);
      setFilteredWarga(data.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsError(true);
        setErrorMessage(error.message);
      } else {
        setIsError(true);
        setErrorMessage("An unknown error occurred");
      }
    } finally {
      setTimeout(() => {
        setIsError(false);
        setErrorMessage("");
      }, 2500);
    }
  };

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredWarga = warga.reduce((result: ListWargaType[], warga) => {
      if (
        warga.nama_warga.toLowerCase().includes(searchValue) ||
        warga.blok_rumah.toLowerCase().includes(searchValue)
      ) {
        result.push(warga);
      }
      return result;
    }, []);
    setFilteredWarga(filteredWarga);
  }, 1000);

  const renderError = (title: string) => {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full">
        <div className="flex flex-col w-full p-4">
          <div key="danger" className="w-full flex items-center my-3">
            <Alert color={"danger"} title={title} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        {isError && renderError(errorMessage)}
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Warga</span>
          <span> / </span>{" "}
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Warga</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            onChange={handleSearch}
            placeholder="Search users"
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddWargas />
          <AddWargasImport />
          <Button
            color="primary"
            startContent={<ExportIcon />}
            onClick={handleExportCSV}
          >
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper items={filteredWarga} />
      </div>
    </div>
  );
};
