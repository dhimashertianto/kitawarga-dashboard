import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { PaymentsIcon, PaymentsIconWhite } from "../icons/sidebar/payments-icon";

type Props = {
  totalDana: String,
  walletWarga: String,
  rekeningPengurus: String
}
export const CardBalance1 = ({ totalDana, walletWarga, rekeningPengurus }: Props) => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <PaymentsIconWhite  />
          <div className="flex flex-col">
            <span className="text-white">Total Saldo (Akumulasi)</span>
            {/* <span className="text-white text-xs">1311 Cars</span> */}
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">{totalDana}</span>
          {/* <span className="text-success text-xs">+ 4.5%</span> */}
        </div>
        <div className="flex gap-2 py-2 flex-col">
          <span className="text-white">Wallet Warga</span>
          <span className="text-white text-xl font-semibold">{walletWarga}</span>
          {/* <span className="text-success text-xs">+ 4.5%</span> */}
        </div>
        <div className="flex gap-2 py-2 flex-col">
          <span className="text-white">Rekening Pengurus</span>
          <span className="text-white text-xl font-semibold">{rekeningPengurus}</span>
          {/* <span className="text-success text-xs">+ 4.5%</span> */}
        </div>
        
        {/* <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-success text-xs">{"↓"}</span>
              <span className="text-xs text-white">100,930</span>
            </div>
            <span className="text-white text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↑"}</span>
              <span className="text-xs text-white">54,120</span>
            </div>
            <span className="text-white text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"⭐"}</span>
              <span className="text-xs text-white">125</span>
            </div>
            <span className="text-white text-xs">VIP</span>
          </div>
        </div> */}
      </CardBody>
    </Card>
  );
};
