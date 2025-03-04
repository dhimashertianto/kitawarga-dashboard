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
import { DataRwType } from "@/helpers/types";
import { fetchData } from "@/actions/api";
import { DeleteRw as DeleteRwApi } from "@/constants/constants";
export const DetailRw = ({ items }: { items: DataRwType }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [rwDetails, setRwDetails] = useState<DataRwType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setRwDetails(items);
    onOpen();
  };

  const submitDelete = async () => {
    setLoading(true);
    try {
      await fetchData(DeleteRwApi, {
        id_rw: rwDetails?.id_rw,
      });
      setIsEditErrorMessage("success");
      setIsEditError(true);
      onClose();
      window.location.reload();
    } catch (error: unknown) {
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
          <ModalHeader className="flex flex-col gap-1">RW Details</ModalHeader>
          <ModalBody>
            {rwDetails ? (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ID"
                  className="max-w-xs"
                  value={rwDetails.id_rw}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Nomor RW"
                  value={rwDetails.nomor_rw}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="ID Perumahan"
                  value={rwDetails.id_perumahan}
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

      {/* Delete Confirmation Modal */}
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
            <p>Are you sure you want to delete RW {rwDetails?.nomor_rw}?</p>
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
