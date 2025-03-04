import { DetailPerumahanType } from "@/helpers/types";
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
import { fetchData } from "@/actions/api";
import { DeletePerumahan as DeletePerumahanAPI } from "@/constants/constants";
export const DetailPerumahan = ({
  items,
}: {
  items: DetailPerumahanType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [perumahanDetails, setPerumahanDetails] =
    useState<DetailPerumahanType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setPerumahanDetails(items);
    onOpen();
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(items.createdAt));

  const submitDelete = async () => {
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
            <p>
              Are you sure you want to delete Perumahan{" "}
              {perumahanDetails?.nama_perumahan}?
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
