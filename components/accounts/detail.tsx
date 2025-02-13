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
import React, { useState } from "react";
import { EyeIcon } from "../icons/table/eye-icon";
import { perumahan } from "./table/data";
import { DetailPerumahanType } from "@/helpers/types";

export const Detailperumahan = ({
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

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const date = new Date(items.createdAt);
  const formattedDate = date
    .toLocaleDateString("en-GB", options)
    .replace(",", "");

  return (
    <div>
      <Tooltip content="View Details">
        <button onClick={handleViewDetails}>
          <EyeIcon size={20} fill="#979797" />
        </button>
      </Tooltip>

      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Perumahan Details
          </ModalHeader>
          <ModalBody>
            {perumahanDetails ? (
              <>
                <Input
                  label="Id Perumahan"
                  value={perumahanDetails.id_perumahan}
                  variant="bordered"
                  readOnly
                />
                <Input
                  label="Nama Perumahan"
                  value={perumahanDetails.nama_perumahan}
                  variant="bordered"
                  readOnly
                />
                <Input
                  label="Alamat Perumahan"
                  value={perumahanDetails.alamat_perumahan}
                  variant="bordered"
                  readOnly
                />
                <Input
                  label="Saldo Perumahan"
                  value={perumahanDetails.saldo_perumahan}
                  variant="bordered"
                  readOnly
                />
                <Input
                  label="Status Account"
                  value={
                    perumahanDetails.status_account === "1"
                      ? "Subscribed"
                      : "Regular"
                  }
                  variant="bordered"
                  readOnly
                />
                <Input
                  label="Created At"
                  value={formattedDate}
                  variant="bordered"
                  readOnly
                />
              </>
            ) : (
              <p>Loading details...</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
