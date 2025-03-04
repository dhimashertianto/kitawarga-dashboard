import { DataKaryawanType } from "@/helpers/types";
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
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { formatCurrency } from "@/helpers/format";
export const DetailKaryawan = ({
  items,
}: {
  items: DataKaryawanType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [karyawanDetails, setKaryawanDetails] =
    useState<DataKaryawanType | null>(null);

  const handleViewDetails = () => {
    setKaryawanDetails(items);
    onOpen();
  };

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
            Warga Details
          </ModalHeader>
          <ModalBody>
            {karyawanDetails ? (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ID"
                  className="max-w-xs"
                  value={karyawanDetails.id_karyawan}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Nama Karyawan"
                  value={karyawanDetails.nama_karyawan}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Posisi"
                  value={karyawanDetails.posisi}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Gaji Pokok"
                  value={formatCurrency(parseInt(karyawanDetails.gaji_bulanan))}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Created At"
                  value={karyawanDetails.createdAt}
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
