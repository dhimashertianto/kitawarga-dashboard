import { fetchData } from "@/actions/api";
import { EditRw as EditRwApi } from "@/constants/constants";
import { DataRwType } from "@/helpers/types";
import { Spinner } from "@heroui/react";
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
import { ErrorAlert } from "@/components/alert/alert";
import { EditIcon } from "@/components/icons/table/edit-icon";
export const EditRw = ({ items }: { items: DataRwType }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rwDetails, setRwDetails] = useState<DataRwType | null>(null);
  const [nomorRw, setNomorRw] = useState<string>(items.nomor_rw);
  const [idPerumahan, setIdPerumahan] = useState<string>(items.id_perumahan);
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorrMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setRwDetails(items);
    setNomorRw(items.nomor_rw);
    setIdPerumahan(items.id_perumahan);
    onOpen();
  };
  const handleNomorRwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomorRw(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetchData(EditRwApi, {
        id_rw: rwDetails?.id_rw,
        nomor_rw: nomorRw,
        id_perumahan: idPerumahan,
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
          <EditIcon size={20} fill="#979797" />
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
                  value={nomorRw}
                  variant="bordered"
                  onChange={handleNomorRwChange}
                />
              </div>
            ) : (
              <p>Loading details...</p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              variant="bordered"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <Spinner size="sm" color="primary" /> : "Save"}
            </Button>

            <Button color="danger" variant="flat" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
