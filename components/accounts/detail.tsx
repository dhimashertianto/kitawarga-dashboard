import { DetailPerumahanType } from "@/helpers/types";
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

export const DetailPerumahan = ({
  items,
}: {
  items: DetailPerumahanType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [perumahanDetails, setPerumahanDetails] =
    useState<DetailPerumahanType | null>(null);

  const handleViewDetails = () => {
    setPerumahanDetails(items);
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
            Perumahan Details
          </ModalHeader>
          <ModalBody>
            {perumahanDetails ? (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ID"
                  className="max-w-xs"
                  value={perumahanDetails.id_perumahan}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Nama Perumahan"
                  value={perumahanDetails.nama_perumahan}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Alamat Perumahan"
                  value={perumahanDetails.alamat_perumahan}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Saldo"
                  value={perumahanDetails.saldo_perumahan}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Type"
                  value={
                    perumahanDetails.status_account === "1"
                      ? "Subscribed"
                      : "Regular"
                  }
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
