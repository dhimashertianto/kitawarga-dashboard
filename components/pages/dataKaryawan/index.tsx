// accounts.tsx
"use client";
import { fetchData } from "@/actions/api";
import { TableWrapper } from "@/components/pages/dataKaryawan/table/table";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { ListKaryawan } from "@/constants/constants";
import { DataKaryawanType } from "@/helpers/types";
import { Alert } from "@heroui/react";
import { Button, Input } from "@nextui-org/react";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { AddKaryawan } from "@/components/pages/dataKaryawan/add-karyawan";
import { exportToCSV } from "@/utils/exportUtils";

export const DataKaryawan = () => {
  const [karyawan, setKaryawan] = useState<DataKaryawanType[]>([]);
  const [filteredKaryawan, setFilteredKaryawan] = useState<DataKaryawanType[]>(
    []
  );
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getKaryawan();
  }, []);

  const handleExportCSV = () => {
    exportToCSV({
      data: filteredKaryawan,
      filename: "Laporan Data Karyawan",
      headers: ["Nama Karyawan", "Posisi", "Gaji Bulanan"],
      mapper: (item) => [item.nama_karyawan, item.posisi, item.gaji_bulanan],
    });
  };

  const getKaryawan = async () => {
    const id = Cookies.get("id_perumahan");
    try {
      const response = await fetchData(ListKaryawan, {
        id_perumahan: id,
      });
      const data = response as { data: DataKaryawanType[] };
      setKaryawan(data.data);
      setFilteredKaryawan(data.data);
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
    const filteredKaryawan = karyawan.reduce(
      (result: DataKaryawanType[], karyawan) => {
        if (
          karyawan.nama_karyawan.toLowerCase().includes(searchValue) ||
          karyawan.posisi.toLowerCase().includes(searchValue)
        ) {
          result.push(karyawan);
        }
        return result;
      },
      []
    );
    setFilteredKaryawan(filteredKaryawan);
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
          <span>Karyawan</span>
          <span> / </span>{" "}
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Karyawan</h3>
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
          <AddKaryawan />
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
        <TableWrapper items={filteredKaryawan} />
      </div>
    </div>
  );
};
