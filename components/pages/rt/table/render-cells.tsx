// components/accounts/table/render-cells.tsx
import { DataRtType, DataRwType } from "@/helpers/types";
import { Tooltip } from "@nextui-org/react";
import { DeleteRt } from "@/components/pages/rt/delete-rt";
import { DetailRt } from "@/components/pages/rt/detail-rt";
import { EditRt } from "@/components/pages/rt/edit-rt";
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
  rt,
  columnKey,
}: {
  rt: DataRtType;
  columnKey: string | React.Key;
  index?: number;
}): JSX.Element => {
  const cellValue = rt[columnKey as keyof DataRtType];

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <Tooltip content="Details">
            <DetailRt items={rt} />
          </Tooltip>
          <Tooltip content="Edit perumahan" color="secondary">
            <EditRt items={rt} />
          </Tooltip>
          <Tooltip content="Delete perumahan" color="secondary">
            <DeleteRt items={rt} />
          </Tooltip>
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
