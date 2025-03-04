// components/accounts/table/render-cells.tsx
import { convertTimestampToDate, formatCurrency } from "@/helpers/format";
import { ListPemasukanType } from "@/helpers/types";

/**
 * Renders a cell in the table, taking into account the column key and the data type.
 *
 * @param {Props} props The props object.
 * @param {ListPemasukanType} props.perumahan The data object.
 * @param {string | React.Key} props.columnKey The column key.
 * @param {number} [props.index] The index of the data object in the array.
 * @returns {JSX.Element} The rendered cell.
 */
export const RenderCell = ({
  pemasukan,
  columnKey,
}: {
  pemasukan: ListPemasukanType;
  columnKey: string | React.Key;
  index?: number;
}): JSX.Element => {
  const cellValue = pemasukan[columnKey as keyof ListPemasukanType];

  switch (columnKey) {
    case "nama_pembayar":
      return (
        <div>
          <span>{pemasukan.nama_pembayar}</span>
        </div>
      );
    case "nomor_rumah":
      return (
        <div>
          <span>{pemasukan.nomor_rumah}</span>
        </div>
      );
    case "tanggal_transaksi":
      return (
        <div>
          <span>
            {convertTimestampToDate(parseInt(pemasukan.tanggal_transaksi))}
          </span>
        </div>
      );
    case "bulan":
      return (
        <div>
          <span>{pemasukan.bulan}</span>
        </div>
      );
    case "nilai_transaksi":
      return (
        <div>
          <span>{formatCurrency(parseInt(pemasukan.nilai_transaksi))}</span>
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
