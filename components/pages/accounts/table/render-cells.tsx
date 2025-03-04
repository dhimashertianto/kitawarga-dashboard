// components/accounts/table/render-cells.tsx
import { Tooltip } from "@nextui-org/react";
import { DetailPerumahan } from "../detail";
import { DetailPerumahanType } from "@/helpers/types";
import { formatCurrency } from "@/helpers/format";
import { Editperumahan } from "../edit";
import { DeletePerumahan } from "../delete";

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
  perumahan,
  columnKey,
}: {
  perumahan: DetailPerumahanType;
  columnKey: string | React.Key;
  index?: number;
}): JSX.Element => {
  const cellValue = perumahan[columnKey as keyof DetailPerumahanType];

  switch (columnKey) {
    case "nama_perumahan":
      return (
        <div>
          <span>{perumahan.nama_perumahan}</span>
        </div>
      );
    case "alamat_perumahan":
      return (
        <div>
          <span>{perumahan.alamat_perumahan}</span>
        </div>
      );
    case "saldo_perumahan":
      return (
        <div>
          <span>{formatCurrency(parseInt(perumahan.saldo_perumahan))}</span>
        </div>
      );
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <Tooltip content="Details">
            <DetailPerumahan items={perumahan} />
          </Tooltip>
          <Tooltip content="Edit perumahan" color="secondary">
            <Editperumahan items={perumahan} />
          </Tooltip>
          <Tooltip content="Delete perumahan" color="secondary">
            <DeletePerumahan items={perumahan} />
          </Tooltip>
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
