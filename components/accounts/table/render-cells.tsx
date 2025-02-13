// components/accounts/table/render-cells.tsx
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { EditIcon } from "../../icons/table/edit-icon";
import { EyeIcon } from "../../icons/table/eye-icon";
import { Detailperumahan } from "../detail";
import { DetailPerumahanType } from "@/helpers/types";

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
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <Tooltip content="Details">
            <Detailperumahan items={perumahan} />
          </Tooltip>
          <Tooltip content="Edit perumahan" color="secondary">
            <button
              onClick={() =>
                console.log("Edit perumahan", perumahan.id_perumahan)
              }
            >
              <EditIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Delete perumahan" color="secondary">
            <button
              onClick={() =>
                console.log("Delete perumahan", perumahan.id_perumahan)
              }
            >
              <DeleteIcon size={20} fill="#FF0080" />
            </button>
          </Tooltip>
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
