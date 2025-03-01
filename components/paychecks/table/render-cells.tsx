// components/accounts/table/render-cells.tsx
import { formatCurrency } from "@/helpers/format";
import { ListGajiKaryawanType } from "@/helpers/types";

/**
 * Renders a cell in the table, taking into account the column key and the data type.
 *
 * @param {Props} props The props object.
 * @param {ListGajiKaryawanType} props.gaji The data object.
 * @param {string | React.Key} props.columnKey The column key.
 * @param {number} [props.index] The index of the data object in the array.
 * @returns {JSX.Element} The rendered cell.
 */
export const RenderCell = ({
  gaji,
  columnKey,
}: {
  gaji: ListGajiKaryawanType;
  columnKey: string | React.Key;
  index?: number;
}): JSX.Element => {
  const cellValue = gaji[columnKey as keyof ListGajiKaryawanType];

  switch (columnKey) {
    case "nama_karyawan":
      return (
        <div>
          <span>{gaji.nama_karyawan}</span>
        </div>
      );
    case "posisi":
      return (
        <div>
          <span>{gaji.posisi}</span>
        </div>
      );
    case "gaji_bulanan":
      return (
        <div>
          <span>{formatCurrency(parseInt(gaji.gaji_bulanan))}</span>
        </div>
      );
    case "bulan":
      return (
        <div>
          <span>{gaji.bulan}</span>
        </div>
      );

    default:
      return <span>{cellValue}</span>;
  }
};
