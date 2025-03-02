// accounts.tsx
"use client";
import { fetchData } from "@/actions/api";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { ListOtherKaryawan } from "@/constants/constants";
import { ListOtherType } from "@/helpers/types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Alert } from "@heroui/react";
import { Button, Input } from "@nextui-org/react";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TableWrapper } from "./table/table";
import { ChevronDownIcon } from "@/components/icons/sidebar/chevron-down-icon";

export const Others = () => {
  const [others, setOthers] = useState<ListOtherType[]>([]);
  const [filteredOthers, setFilteredOthers] = useState<ListOtherType[]>([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getOthers = async () => {
      try {
        const response = await fetchData(ListOtherKaryawan, {
          id_perumahan: Cookies.get("id_perumahan"),
          tahun: selectedYear,
        });
        const typedResponse = response as { data: ListOtherType[] };
        setOthers(typedResponse.data);
        setFilteredOthers(typedResponse.data);
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

    getOthers();
  }, [selectedYear]);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 5; i++) {
      years.push((currentYear - i).toString());
    }
    return years;
  };

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredOthers = others.reduce((result: ListOtherType[], other) => {
      if (
        other.data
          .map((item) => item.nama_transaksi_pengeluaran_bulanan)
          .join(", ")
          .toLowerCase()
          .includes(searchValue)
      ) {
        result.push(other);
      }
      return result;
    }, []);
    setFilteredOthers(filteredOthers);
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

      <h3 className="text-xl font-semibold">All Accounts</h3>
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
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" endContent={<ChevronDownIcon />}>
                {selectedYear}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Year Selection"
              selectedKeys={new Set([selectedYear])}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0]?.toString();
                if (selected) {
                  setSelectedYear(selected);
                }
              }}
              selectionMode="single"
            >
              {generateYearOptions().map((year) => (
                <DropdownItem key={year}>{year}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper items={filteredOthers} />
      </div>
    </div>
  );
};
