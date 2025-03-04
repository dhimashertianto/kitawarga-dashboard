// components/accounts/table/render-cells.tsx
import { DataRwType } from "@/helpers/types";
import { Tooltip } from "@nextui-org/react";
import { DeleteRw } from "@/components/pages/rw/delete-rw";
import { DetailRw } from "@/components/pages/rw/detail-rw";
import { EditRw } from "@/components/pages/rw/edit-rw";
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
  rw,
  columnKey,
}: {
  rw: DataRwType;
  columnKey: string | React.Key;
  index?: number;
}): JSX.Element => {
  const cellValue = rw[columnKey as keyof DataRwType];

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <Tooltip content="Details">
            <DetailRw items={rw} />
          </Tooltip>
          <Tooltip content="Edit perumahan" color="secondary">
            <EditRw items={rw} />
          </Tooltip>
          <Tooltip content="Delete perumahan" color="secondary">
            <DeleteRw items={rw} />
          </Tooltip>
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
