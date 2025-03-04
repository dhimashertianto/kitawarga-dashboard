import { fetchData } from "@/actions/api";
import { EditRt as EditRtApi } from "@/constants/constants";
import { DataRtType } from "@/helpers/types";
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
export const EditRt = ({ items }: { items: DataRtType }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rtDetails, setRtDetails] = useState<DataRtType | null>(null);
  const [nomorRt, setNomorRt] = useState<string>(items.nomor_rt);
  const [idRw, setIdRw] = useState<string>(items.id_rw);
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorrMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setRtDetails(items);
    setNomorRt(items.nomor_rt);
    setIdRw(items.id_rw);
    onOpen();
  };
  const handleNomorRtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomorRt(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetchData(EditRtApi, {
        id_rt: rtDetails?.id_rt,
        nomor_rt: nomorRt,
        id_rw: idRw,
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
          <ModalHeader className="flex flex-col gap-1">RT Details</ModalHeader>
          <ModalBody>
            {rtDetails ? (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ID"
                  className="max-w-xs"
                  value={rtDetails.id_rt}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Nomor RT"
                  value={nomorRt}
                  variant="bordered"
                  onChange={handleNomorRtChange}
                />
                <Input label="ID RW" value={idRw} variant="flat" readOnly />
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
