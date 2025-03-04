import { fetchData } from "@/actions/api";
import { DeleteRw as DeleteRwApi } from "@/constants/constants";
import { DataRwType } from "@/helpers/types";
import { Spinner } from "@heroui/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { ErrorAlert } from "@/components/alert/alert";
import { DeleteIcon } from "@/components/icons/table/delete-icon";

export const DeleteRw = ({ items }: { items: DataRwType }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rwDetails, setRwDetails] = useState<DataRwType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorrMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setRwDetails(items);
    onOpen();
  };

  const handleSubmit = async () => {
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

  return (
    <div>
      <Tooltip content="Edit Details">
        <button onClick={handleViewDetails}>
          <DeleteIcon size={20} fill="#FF0080" />
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
          {isEditError && (
            <ErrorAlert title={isEditErrorrMessage} color="danger" />
          )}
          <ModalHeader className="flex flex-col gap-1">RW Details</ModalHeader>
          <ModalBody>
            {rwDetails ? (
              <div className="grid  gap-4">
                <p>
                  Are You Sure Delete <b>{rwDetails?.nomor_rw}</b> Permanently ?{" "}
                </p>
              </div>
            ) : (
              <p>Loading details...</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="bordered"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" color="danger" /> : "Delete"}
            </Button>

            <Button color="warning" variant="flat" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
