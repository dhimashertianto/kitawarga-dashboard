import { fetchData } from "@/actions/api";
import { EditPerumahan } from "@/constants/constants";
import { DetailPerumahanType } from "@/helpers/types";
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

export const Editperumahan = ({
  items,
}: {
  items: DetailPerumahanType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [perumahanDetails, setPerumahanDetails] =
    useState<DetailPerumahanType | null>(null);
  const [namaPerumahan, setNamaPerumahan] = useState<string>(
    items.nama_perumahan
  );
  const [alamatPerumahan, setAlamatPerumahan] = useState<string>(
    items.alamat_perumahan
  );
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorrMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setPerumahanDetails(items);
    setNamaPerumahan(items.nama_perumahan);
    setAlamatPerumahan(items.alamat_perumahan);
    onOpen();
  };

  const handleNamaPerumahanChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNamaPerumahan(e.target.value);
  };

  const handleAlamatPerumahanChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAlamatPerumahan(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetchData(EditPerumahan, {
        id_perumahan: perumahanDetails?.id_perumahan,
        nama_perumahan: namaPerumahan,
        alamat_perumahan: alamatPerumahan,
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

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(items.createdAt));

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
                  value={namaPerumahan}
                  variant="bordered"
                  onChange={handleNamaPerumahanChange}
                />
                <Input
                  label="Alamat Perumahan"
                  value={alamatPerumahan}
                  variant="bordered"
                  onChange={handleAlamatPerumahanChange}
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
