// components/accounts/table/render-cells.tsx
import { formatDate } from "@/helpers/format";
import { ListCategoryType } from "@/helpers/types";
import { Tooltip } from "@nextui-org/react";
import { DeleteCategory } from "../delete-category";
import { DetailCategory } from "../detail-category";
import { EditCategory } from "../edit-category";

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
  category,
  columnKey,
}: {
  category: ListCategoryType;
  columnKey: string | React.Key;
  index?: number;
}): JSX.Element => {
  const cellValue = category[columnKey as keyof ListCategoryType];

  switch (columnKey) {
    case "nama_kategori_transaksi":
      return (
        <div>
          <span>{category.nama_kategori_transaksi}</span>
        </div>
      );
    case "keterangan_kategori_transaksi":
      return (
        <div>
          <span>{category.keterangan_kategori_transaksi}</span>
        </div>
      );
    case "createdAt":
      return (
        <div>
          <span>{formatDate(category.createdAt)}</span>
        </div>
      );
    case "updatedAt":
      return (
        <div>
          <span>{formatDate(category.updatedAt)}</span>
        </div>
      );
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <Tooltip content="Details">
            <DetailCategory items={category} />
          </Tooltip>
          <Tooltip content="Edit perumahan" color="secondary">
            <EditCategory items={category} />
          </Tooltip>
          <Tooltip content="Delete perumahan" color="secondary">
            <DeleteCategory items={category} />
          </Tooltip>
        </div>
      );
    default:
      return <span>{cellValue}</span>;
  }
};
