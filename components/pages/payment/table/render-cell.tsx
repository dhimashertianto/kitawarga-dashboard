import { Chip } from "@nextui-org/react";
import React from "react";

interface Props {
  // @ts-ignore
  dataCell: typeof PaymentList [number];
  columnKey: string | React.Key;
}

export const RenderCell = ({ dataCell, columnKey }: Props) => {  
  // @ts-ignore
  const cellValue = dataCell[columnKey];
  switch (columnKey) {
    case "nama_pembayar":
      return (
        <span className="capitalize text-xs">{cellValue}</span>
      );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "PAID"
              ? "success"
              : "danger"
          }
        >
          <span className="capitalize text-xs">{cellValue}</span>
        </Chip>
      );
    case "tanggal_transaksi":      
      const date = new Date(cellValue * 1000);
      return (
        <span className="capitalize text-xs">{date.toLocaleDateString('id', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      )
    case "amount":
      return (
        <span className="capitalize text-xs">{`Rp.${cellValue}`}</span>
      )
    case "fee_kitawarga":
      return (
        <span className="capitalize text-xs">{`Rp.${cellValue}`}</span>
      )
    case "fee_biaya_pembayaran":
      return (
        <span className="capitalize text-xs">{`Rp.${cellValue}`}</span>
      )
    default:
      return cellValue;
  }
};
