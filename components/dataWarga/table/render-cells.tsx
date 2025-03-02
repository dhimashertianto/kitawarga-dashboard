// components/accounts/table/render-cells.tsx
import { formatCurrency, formatDate } from "@/helpers/format";
import { ListWargaType } from "@/helpers/types";
import { Tooltip } from "@nextui-org/react";
import { DeleteWargas } from "../delete-warga";
import { DetailWargas } from "../detail-warga";
import { EditWargas } from "../edit-warga";

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
  warga,
  columnKey,
}: {
  warga: ListWargaType;
  columnKey: string | React.Key;
  index?: number;
}): JSX.Element => {
  const cellValue = warga[columnKey as keyof ListWargaType];

  switch (columnKey) {
    case "biaya_ipl":
      return <span>{formatCurrency(parseInt(warga.biaya_ipl))}</span>;
    case "biaya_penambahan":
      return <span>{formatCurrency(parseInt(warga.biaya_penambahan))}</span>;
    case "nomor_rumah":
      return (
        <span>{"No. " + warga.nomor_rumah + " Blok " + warga.blok_rumah}</span>
      );
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <Tooltip content="Details">
            <DetailWargas items={warga} />
          </Tooltip>
          <Tooltip content="Edit perumahan" color="secondary">
            <EditWargas items={warga} />
          </Tooltip>
          <Tooltip content="Delete perumahan" color="secondary">
            <DeleteWargas items={warga} />
          </Tooltip>
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
