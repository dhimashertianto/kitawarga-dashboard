import { DetailPerumahanType, ListCategoryType } from "@/helpers/types";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { EyeIcon } from "../icons/table/eye-icon";

export const DetailCategory = ({
  items,
}: {
  items: ListCategoryType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryDetails, setCategoryDetails] =
    useState<ListCategoryType | null>(null);

  const handleViewDetails = () => {
    setCategoryDetails(items);
    onOpen();
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(items.createdAt));

  return (
    <div>
      <Tooltip content="View Details">
        <button onClick={handleViewDetails}>
          <EyeIcon size={20} fill="#979797" />
        </button>
      </Tooltip>

      <Modal
        size="2xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onClose}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Category Details
          </ModalHeader>
          <ModalBody>
            {categoryDetails ? (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ID"
                  className="max-w-xs"
                  value={categoryDetails.id_kategori}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Nama Category"
                  value={categoryDetails.nama_kategori_transaksi}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Keterangan Category"
                  value={categoryDetails.keterangan_kategori_transaksi}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Created At"
                  value={formattedDate}
                  variant="flat"
                  readOnly
                />
              </div>
            ) : (
              <p>Loading details...</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              Close
            </Button>
            <Button color="danger" variant="bordered" onClick={onClose}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
