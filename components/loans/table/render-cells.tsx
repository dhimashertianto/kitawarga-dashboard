// components/accounts/table/render-cells.tsx
import { formatCurrency } from "@/helpers/format";
import { ListKasbonDataType, ListKasbonType } from "@/helpers/types";

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
  kasbon,
  columnKey,
}: {
  kasbon: ListKasbonType;
  columnKey: string | React.Key;
  index?: number;
}): JSX.Element => {
  const cellValue = kasbon[columnKey as keyof ListKasbonType];
  const pinjaman = kasbon.data.reduce(
    (total, item) => total + parseInt(item.pinjaman),
    0
  );
  const angsuranPerBulan = kasbon.data.reduce(
    (total, item) => total + parseInt(item.angsuran_per_bulan),
    0
  );
  const tenor = kasbon.data.reduce(
    (total, item) => total + parseInt(item.tenor),
    0
  );
  const sisaKasbon = kasbon.data.reduce(
    (total, item) => total + parseInt(item.sisa_kasbon),
    0
  );
  const keterangan = kasbon.data.map((item) => item.keterangan).join(", ");
  switch (columnKey) {
    case "nama_karyawan":
      return (
        <div>
          <span>{kasbon.nama_karyawan}</span>
        </div>
      );
    case "pinjaman":
      return (
        <div>
          <span>{formatCurrency(pinjaman)}</span>
        </div>
      );
    case "angsuran_per_bulan":
      return (
        <div>
          <span>{formatCurrency(angsuranPerBulan)}</span>
        </div>
      );
    case "tenor":
      return (
        <div>
          <span>{tenor}</span>
        </div>
      );
    case "sisa_kasbon":
      return (
        <div>
          <span>{formatCurrency(sisaKasbon)}</span>
        </div>
      );
    case "keterangan":
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
