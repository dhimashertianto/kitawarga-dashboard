// components/accounts/table/render-cells.tsx
import { convertTimestampToDate } from "@/helpers/format";
import { formatCurrency } from "@/helpers/format";
import { ListOtherType } from "@/helpers/types";

/**
 * Renders a cell in the table, taking into account the column key and the data type.
 *
 * @param {Props} props The props object.
 * @param {ListKasbonType} props.kasbon The data object.
 * @param {string | React.Key} props.columnKey The column key.
 * @param {number} [props.index] The index of the data object in the array.
 * @returns {JSX.Element} The rendered cell.
 */
export const RenderCell = ({
  other,
  columnKey,
}: {
  other: ListOtherType;
  columnKey: string | React.Key;
  index?: number;
}): JSX.Element => {
  const cellValue = other[columnKey as keyof ListOtherType];

  const keterangan = other.data
    .map((item) => item.keterangan_pengeluaran_bulanan)
    .join(", ");
  const tanggal = other.data
    .map((item) => item.tanggal_transaksi_pengeluaran_bulanan)
    .join("");
  switch (columnKey) {
    case "nama_transaksi_pengeluaran_bulanan":
      return (
        <div>
          <span>
            {other.data
              .map((item) => item.nama_transaksi_pengeluaran_bulanan)
              .join(", ")}
          </span>
        </div>
      );
    case "bulan":
      return (
        <div>
          <span>{other.bulan}</span>
        </div>
      );
    case "keterangan_pengeluaran_bulanan":
      return (
        <div>
          <span>{keterangan}</span>
        </div>
      );
    case "nilai_transaksi_pengeluaran_bulanan":
      return (
        <div>
          <span>
            {formatCurrency(
              other.data.reduce(
                (total, item) =>
                  total + parseInt(item.nilai_transaksi_pengeluaran_bulanan),
                0
              )
            )}
          </span>
        </div>
      );
    case "bukti_foto_pengeluaran_bulanan":
      return (
        <div>
          <span>
            {other.data
              .map((item) => item.bukti_foto_pengeluaran_bulanan)
              .join(", ")}
          </span>
        </div>
      );
    case "tanggal_transaksi_pengeluaran_bulanan":
      return (
        <div>
          <span>{convertTimestampToDate(parseInt(tanggal))}</span>
        </div>
      );
    case "keterangan_kategori_transaksi":
      return (
        <div>
          <span>{keterangan}</span>
        </div>
      );

    default:
      return (
        <span>
          {Array.isArray(cellValue) ? JSON.stringify(cellValue) : cellValue}
        </span>
      );
  }
};
