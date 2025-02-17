// accounts.tsx
"use client";
import { fetchData, getData } from "@/actions/api";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { ListPemasukan, Listperumahan } from "@/constants/constants";
import { DetailPerumahanType, ListPemasukanType } from "@/helpers/types";
import { Alert } from "@heroui/react";
import { Button, Input } from "@nextui-org/react";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TableWrapper } from "./table/table";

export const Revenue = () => {
  const router = useRouter();

  const [perumahan, setPerumahan] = useState<DetailPerumahanType[]>([]);
  const [filteredPerumahan, setFilteredPerumahan] = useState<
    DetailPerumahanType[]
  >([]);

  const [pemasukan, setPemasukan] = useState<ListPemasukanType[]>([]);
  const [filteredPemasukan, setFilteredPemasukan] = useState<
    ListPemasukanType[]
  >([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getPerumahan();
    getPemasukan();
  }, []);

  const getPemasukan = async () => {
    try {
      const response: { data: ListPemasukanType[] } = await fetchData(
        ListPemasukan
      );
      setPemasukan(response.data);
      setFilteredPemasukan(response.data);
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

  const getPerumahan = async () => {
    try {
      const response = await getData(Listperumahan);
      setPerumahan(response.data);
      setFilteredPerumahan(response.data);
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
    const filteredPemasukan = pemasukan.reduce(
      (result: ListPemasukanType[], pemasukan) => {
        if (pemasukan.nama_pembayar.toLowerCase().includes(searchValue)) {
          result.push(pemasukan);
        }
        return result;
      },
      []
    );
    setFilteredPemasukan(filteredPemasukan);
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
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper items={filteredPemasukan} />
      </div>
    </div>
  );
};
