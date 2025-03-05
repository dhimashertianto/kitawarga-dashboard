// accounts.tsx
"use client";
import { getData } from "@/actions/api";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { AddCategory } from "@/components/pages/categorys/add-category";
import { TableWrapper } from "@/components/pages/categorys/table/table"; // Import the table component
import { ListKategori } from "@/constants/constants";
import { ListCategoryType } from "@/helpers/types";
import { exportToCSV } from "@/utils/exportUtils";
import { Alert } from "@heroui/react";
import { Button, Input } from "@nextui-org/react";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Categorys = () => {
  const router = useRouter();

  const [category, setCategory] = useState<ListCategoryType[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<ListCategoryType[]>(
    []
  );
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getCategory();
  }, []);

  const handleExportCSV = () => {
    exportToCSV({
      data: filteredCategory,
      filename: "Laporan Data Kategori",
      headers: ["Nama Kategori", "Keterangan Kategori"],
      mapper: (item) => [
        item.nama_kategori_transaksi,
        item.keterangan_kategori_transaksi,
      ],
    });
  };

  const getCategory = async () => {
    try {
      const response = await getData(ListKategori);
      setCategory(response.data);
      setFilteredCategory(response.data);
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
    const filteredCategory = category.reduce(
      (result: ListCategoryType[], category) => {
        if (
          category.nama_kategori_transaksi
            .toLowerCase()
            .includes(searchValue) ||
          category.keterangan_kategori_transaksi
            .toLowerCase()
            .includes(searchValue)
        ) {
          result.push(category);
        }
        return result;
      },
      []
    );
    setFilteredCategory(filteredCategory);
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
          <span>Kategori</span>
          <span> / </span>{" "}
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Kategori</h3>
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
          <AddCategory />
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
        <TableWrapper items={filteredCategory} />
      </div>
    </div>
  );
};
