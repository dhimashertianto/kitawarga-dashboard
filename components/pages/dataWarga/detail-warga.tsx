import { ListWargaType } from "@/helpers/types";
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
import { DeleteWarga } from "@/constants/constants";
export const DetailWargas = ({
  items,
}: {
  items: ListWargaType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [wargaDetails, setWargaDetails] = useState<ListWargaType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setWargaDetails(items);
    onOpen();
  };

  const submitDelete = async () => {
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

  const handleDelete = () => {
    submitDelete();
    onDeleteClose();
    onClose();
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
            Warga Details
          </ModalHeader>
          <ModalBody>
            {wargaDetails ? (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ID"
                  className="max-w-xs"
                  value={wargaDetails.id_warga}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Nama Warga"
                  value={wargaDetails.nama_warga}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Nomor Rumah"
                  value={wargaDetails.nomor_rumah}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Blok Rumah"
                  value={wargaDetails.blok_rumah}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Nomor HP"
                  value={wargaDetails.nomor_hp}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Jenis Kelamin"
                  value={wargaDetails.jenis_kelamin}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Alamat"
                  value={wargaDetails.alamat_perumahan}
                  variant="flat"
                  readOnly
                />

                <Input
                  label="IPL"
                  value={formatCurrency(parseInt(wargaDetails.biaya_ipl))}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Fee"
                  value={formatCurrency(
                    parseInt(wargaDetails.biaya_penambahan)
                  )}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Created At"
                  value={formattedDate}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Updated At"
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
              Are you sure you want to delete Warga {wargaDetails?.nama_warga}?
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
