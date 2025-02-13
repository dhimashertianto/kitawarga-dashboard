// components/accounts/table/render-cells.tsx
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { EditIcon } from "../../icons/table/edit-icon";
import { EyeIcon } from "../../icons/table/eye-icon";
import { perumahan } from "./data"; // Import the data type
import { Detailperumahan } from "../detail";

interface Props {
  user: (typeof perumahan)[number];
  columnKey: string | React.Key;
  index?: number;
}

export const RenderCell = ({ user, columnKey, index }: Props) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "nama_perumahan":
      return (
        <div>
          <span>{user.nama_perumahan}</span>
        </div>
      );
    case "alamat_perumahan":
      return (
        <div>
          <span>{user.alamat_perumahan}</span>
        </div>
      );
    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <Tooltip content="Details">
            <Detailperumahan items={user} />
          </Tooltip>
          <Tooltip content="Edit user" color="secondary">
            <button onClick={() => console.log("Edit user", user.id_perumahan)}>
              <EditIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Delete user" color="secondary">
            <button
              onClick={() => console.log("Delete user", user.id_perumahan)}
            >
              <DeleteIcon size={20} fill="#FF0080" />
            </button>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
