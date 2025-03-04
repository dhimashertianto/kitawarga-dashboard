import { fetchData } from "@/actions/api";
import { DeletePerumahan as DeletePerumahanAPI } from "@/constants/constants";
import { DetailPerumahanType } from "@/helpers/types";
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

export const DeletePerumahan = ({
  items,
}: {
  items: DetailPerumahanType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [perumahanDetails, setPerumahanDetails] =
    useState<DetailPerumahanType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorrMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setPerumahanDetails(items);
    onOpen();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetchData(DeletePerumahanAPI, {
        id_perumahan: perumahanDetails?.id_perumahan,
      });
      setIsEditErrorMessage("success");
      setIsEditError(true);
      onClose();
      window.location.reload();
    } catch (error) {
      setIsEditErrorMessage("Failed Change a Data");
      setIsEditError(true);
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
            Perumahan Details
          </ModalHeader>
          <ModalBody>
            {perumahanDetails ? (
              <div className="grid  gap-4">
                <p>
                  Are You Sure Delete <b>{perumahanDetails.nama_perumahan}</b>{" "}
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
