import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { PaymentsIconBlack, PaymentsIconWhite } from "../icons/sidebar/payments-icon";

type Props = {
  pemasukan: string;
};

export const CardBalance2 = ({ pemasukan }: Props) => {
  return (
    <Card className="xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <PaymentsIconBlack />
          <div className="flex flex-col">
            <span className="text-default-900">Total Pemasukan</span>
            {/* <span className="text-default-900 text-xs">+2400 People</span> */}
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-default-900 text-xl font-semibold">
            {pemasukan}
          </span>
          <span className="text-success text-s">+</span>
        </div>
        {/* <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-success-600 text-xs">
                {"↓"}
              </span>
              <span className="text-xs">11,930</span>
            </div>
            <span className="text-default-900 text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↑"}</span>
              <span className="text-xs">54,120</span>
            </div>
            <span className="text-default-900 text-xs">USD</span>
          </div>

          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"⭐"}</span>
              <span className="text-xs">150</span>
            </div>
            <span className="text-default-900 text-xs">VIP</span>
          </div>
        </div> */}
      </CardBody>
    </Card>
  );
};
