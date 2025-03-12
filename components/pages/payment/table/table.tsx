import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useState } from "react";
import { columns } from "./data";
import { RenderCell } from "./render-cell";
import { PaymentList } from "..";

export const TableWrapper = ({ data }: { data: PaymentList[] }) => {
  const ITEMS_PER_PAGE = 5;
  
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="List Pembayaran">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={ "center"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={paginatedData}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {RenderCell({ dataCell: item, columnKey: columnKey })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center gap-2 mt-2 mb-6">
        <Button onPress={prevPage} color="primary" disabled={currentPage === 1}>Sebelumnya</Button>
        <span className="text-sm">Halaman {currentPage} of {totalPages}</span>
        <Button  onPress={nextPage} color="primary"  disabled={currentPage === totalPages}>Selanjutnya</Button>
      </div>
    </div>
  );
};
