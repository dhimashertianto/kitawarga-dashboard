// accounts.tsx
"use client";
import { fetchData, getData } from "@/actions/api";
import { TableWrapper } from "@/components/pages/rw/table/table";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { ListRw } from "@/constants/constants";
import { DataRwType } from "@/helpers/types";
import { Alert } from "@heroui/react";
import { Button, Input } from "@nextui-org/react";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { AddRw } from "@/components/pages/rw/add-rw";
import { exportToCSV } from "@/utils/exportUtils";

export const DataRw = () => {
  const [rw, setRw] = useState<DataRwType[]>([]);
  const [filteredRw, setFilteredRw] = useState<DataRwType[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getRw();
  }, []);

  const getRw = async () => {
    try {
      const response = await getData(ListRw);
      const data = response as { data: DataRwType[] };
      setRw(data.data);
      setFilteredRw(data.data);
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
    const filteredRw = rw.reduce((result: DataRwType[], rw) => {
      if (rw.nomor_rw.toLowerCase().includes(searchValue)) {
        result.push(rw);
      }
      return result;
    }, []);
    setFilteredRw(filteredRw);
  }, 1000);

  const handleExportCSV = () => {
    exportToCSV({
      data: filteredRw,
      filename: "rw_data",
      headers: ["Nomor RW", "Created At", "Updated At"],
      mapper: (item) => [item.nomor_rw, item.createdAt, item.updatedAt],
    });
  };

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
          <span>RW</span>
          <span> / </span>{" "}
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All RW</h3>
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
          <AddRw />
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
        <TableWrapper items={filteredRw} />
      </div>
    </div>
  );
};
