// components/accounts/table/table.tsx
import { ListCategoryType } from "@/helpers/types";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { columns } from "@/components/pages/categorys/table/data"; // Import data
import { RenderCell } from "@/components/pages/categorys/table/render-cells"; // Import RenderCell function

/**
 * A table component that renders a list of perumahan items.
 *
 * @param { { items: DetailPerumahanType[] } } props The props object.
 * @param { DetailPerumahanType[] } props.items The list of perumahan items to render.
 * @returns { JSX.Element } The table component.
 */
export const TableWrapper: React.FC<{
  items: ListCategoryType[];
}> = ({ items }) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const pages = Math.ceil(items.length / rowsPerPage);

  const item = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return items.slice(start, end);
  }, [page, items]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  const renderDataTable = () => {
    if (loading) {
      return <TableBody emptyContent={"Loading......"}>{[]}</TableBody>;
    }

    if (item.length === 0) {
      return <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>;
    }

    return (
      <TableBody items={item}>
        {(item) => (
          <TableRow key={item.id_kategori}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {RenderCell({ category: item, columnKey })}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    );
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Table
        isStriped
        aria-label="Example table with custom cells"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        {renderDataTable()}
      </Table>
    </div>
  );
};
