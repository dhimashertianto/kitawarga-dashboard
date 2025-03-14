"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "../table/table";
import { CardBalance1 } from "./card-balance1";
import { CardBalance2 } from "./card-balance2";
import { CardBalance3 } from "./card-balance3";
import { CardAgents } from "./card-agents";
import { CardTransactions } from "./card-transactions";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import { fetchData } from "@/actions/api";
import { DashboardURL } from "@/constants/constants";
import Cookies from "js-cookie";
import { DataDashboardType } from "@/helpers/types";
import { Alert } from "@heroui/react";
import { formatCurrency } from "@/helpers/format";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

export const Content = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [dashboard, setDashboard] = React.useState<DataDashboardType>({
    total_saldo: "",
    total_pemasukan_bulan_ini: "",
    total_pengeluaran_bulan_ini: "",
    selisih: "",
    saldo_pengurus: "",
    saldo_xendit: "",
  });

  const getDashboard = async () => {
    try {
      const response: { data: DataDashboardType } = await fetchData(
        DashboardURL, {
        id_perumahan: Cookies.get("id_perumahan"),
      }
      );
      setDashboard(response.data);      
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

  useEffect(() => {
    getDashboard();    
  },[]);


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
    <div className="h-full lg:px-6">
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          {isError && renderError(errorMessage)}
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Saldo Perumahan</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
              <CardBalance1 totalDana={formatCurrency(Number(dashboard.total_saldo))} walletWarga={formatCurrency(Number(dashboard.saldo_pengurus))} rekeningPengurus={formatCurrency(Number(dashboard.saldo_xendit))} />
              <CardBalance2 pemasukan={formatCurrency(Number(dashboard.total_pemasukan_bulan_ini))} />
              <CardBalance3 pengeluaran={formatCurrency(Number(dashboard.total_pengeluaran_bulan_ini))} />
            </div>
          </div>

          {/* Chart */}
          {/* <div className="h-full flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Statistics</h3>
            <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
              <Chart />
            </div>
          </div> */}
        </div>

        {/* Left Section */}
        {/* <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
          <h3 className="text-xl font-semibold">Section</h3>
          <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
            <CardAgents />
            <CardTransactions />
          </div>
        </div> */}
      </div>

      {/* Table Latest Users */}
      {/* <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
        <div className="flex  flex-wrap justify-between">
          <h3 className="text-center text-xl font-semibold">Latest Users</h3>
          <Link
            href="/accounts"
            as={NextLink}
            color="primary"
            className="cursor-pointer"
          >
            View All
          </Link>
        </div>
        <TableWrapper />
      </div> */}
    </div>
  );
};
