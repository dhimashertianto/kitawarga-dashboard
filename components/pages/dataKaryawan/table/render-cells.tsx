// components/accounts/table/render-cells.tsx
import { formatCurrency, formatDate } from "@/helpers/format";
import { DataKaryawanType } from "@/helpers/types";
import { Tooltip } from "@nextui-org/react";
import { DeleteKaryawan } from "@/components/pages/dataKaryawan/delete-karyawan";
import { DetailKaryawan } from "@/components/pages/dataKaryawan/detail-karyawan";
import { EditKaryawan } from "@/components/pages/dataKaryawan/edit-karyawan";

/**
 * Renders a cell in the table, taking into account the column key and the data type.
 *
 * @param {Props} props The props object.
 * @param {DetailPerumahanType} props.perumahan The data object.
 * @param {string | React.Key} props.columnKey The column key.
 * @param {number} [props.index] The index of the data object in the array.
 * @returns {JSX.Element} The rendered cell.
 */
export const RenderCell = ({
  karyawan,
  columnKey,
}: {
  karyawan: DataKaryawanType;
  columnKey: string | React.Key;
  index?: number;
}): JSX.Element => {
  const cellValue = karyawan[columnKey as keyof DataKaryawanType];

  switch (columnKey) {
    case "gaji_bulanan":
      return <span>{formatCurrency(parseInt(karyawan.gaji_bulanan))}</span>;
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <Tooltip content="Details">
            <DetailKaryawan items={karyawan} />
          </Tooltip>
          <Tooltip content="Edit perumahan" color="secondary">
            <EditKaryawan items={karyawan} />
          </Tooltip>
          <Tooltip content="Delete perumahan" color="secondary">
            <DeleteKaryawan items={karyawan} />
          </Tooltip>
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
