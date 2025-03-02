import { fetchData } from "@/actions/api";
import { DeleteWarga } from "@/constants/constants";
import { ListWargaType } from "@/helpers/types";
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
import { ErrorAlert } from "../alert/alert";
import { DeleteIcon } from "../icons/table/delete-icon";

export const DeleteWargas = ({
  items,
}: {
  items: ListWargaType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [wargaDetails, setWargaDetails] = useState<ListWargaType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorrMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setWargaDetails(items);
    onOpen();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetchData(DeleteWarga, {
        id_warga: wargaDetails?.id_warga,
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
          <ModalHeader className="flex flex-col gap-1">
            Warga Details
          </ModalHeader>
          <ModalBody>
            {wargaDetails ? (
              <div className="grid  gap-4">
                <p>
                  Are You Sure Delete <b>{wargaDetails?.nama_warga}</b>{" "}
                  Permanently ?{" "}
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
