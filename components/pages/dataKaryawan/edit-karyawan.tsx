import { fetchData } from "@/actions/api";
import { EditKaryawan as EditKaryawanApi } from "@/constants/constants";
import { formatCurrency } from "@/helpers/format";
import { DataKaryawanType } from "@/helpers/types";
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
import Cookies from "js-cookie";
import { useState } from "react";
import { ErrorAlert } from "@/components/alert/alert";
import { EditIcon } from "@/components/icons/table/edit-icon";
export const EditKaryawan = ({
  items,
}: {
  items: DataKaryawanType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [karyawanDetails, setKaryawanDetails] =
    useState<DataKaryawanType | null>(null);
  const [namaKaryawan, setNamaKaryawan] = useState<string>(items.nama_karyawan);
  const [posisi, setPosisi] = useState<string>(items.posisi);
  const [gajiPokok, setGajiPokok] = useState<string>(items.gaji_bulanan);
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorrMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setKaryawanDetails(items);
    setNamaKaryawan(items.nama_karyawan);
    setPosisi(items.posisi);
    setGajiPokok(items.gaji_bulanan);
    onOpen();
  };
  const handleNamaKaryawanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamaKaryawan(e.target.value);
  };

  const handlePosisiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosisi(e.target.value);
  };

  const handleGajiPokokChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setGajiPokok(numericValue);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetchData(EditKaryawanApi, {
        id_karyawan: karyawanDetails?.id_karyawan,
        nama_karyawan: namaKaryawan,
        posisi: posisi,
        gaji_bulanan: gajiPokok,
        id_perumahan: Cookies.get("id_perumahan"),
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
                  value={namaKaryawan}
                  variant="bordered"
                  onChange={handleNamaKaryawanChange}
                />
                <Input
                  label="Posisi"
                  value={posisi}
                  variant="bordered"
                  onChange={handlePosisiChange}
                />
                <Input
                  label="Gaji Pokok"
                  value={gajiPokok ? formatCurrency(Number(gajiPokok)) : ""}
                  variant="bordered"
                  onChange={handleGajiPokokChange}
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
