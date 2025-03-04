import { DataKaryawanType } from "@/helpers/types";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { EyeIcon } from "@/components/icons/table/eye-icon";
import { formatCurrency } from "@/helpers/format";
import { fetchData } from "@/actions/api";
import { DeleteKaryawan } from "@/constants/constants";
export const DetailKaryawan = ({
  items,
}: {
  items: DataKaryawanType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [karyawanDetails, setKaryawanDetails] =
    useState<DataKaryawanType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setKaryawanDetails(items);
    onOpen();
  };

  const submitDelete = async () => {
    setLoading(true);
    try {
      await fetchData(DeleteKaryawan, {
        id_karyawan: karyawanDetails?.id_karyawan,
      });
      setIsEditErrorMessage("success");
      setIsEditError(true);
      onClose();
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        setIsEditError(true);
        setIsEditErrorMessage(error.message);
      } else {
        setIsEditError(true);
        setIsEditErrorMessage("An unknown error occurred");
      }
    } finally {
      setTimeout(() => {
        setIsEditErrorMessage("");
        setIsEditError(false);
      }, 2500);
      setLoading(false);
    }
  };

  const handleDelete = () => {
    submitDelete();
    onDeleteClose();
    onClose();
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
            Karyawan Details
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
            <Button color="danger" variant="bordered" onClick={onDeleteOpen}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        size="sm"
        backdrop="blur"
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteClose}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Delete Confirmation
          </ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete Karyawan{" "}
              {karyawanDetails?.nama_karyawan}?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="flat" onClick={onDeleteClose}>
              Cancel
            </Button>
            <Button color="danger" variant="solid" onClick={handleDelete}>
              {loading ? <Spinner size="sm" color="primary" /> : "Delete"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
