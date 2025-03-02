import { fetchData } from "@/actions/api";
import { EditWarga } from "@/constants/constants";
import { ListWargaType } from "@/helpers/types";
import { Spinner } from "@heroui/react";
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownItem,
  DropdownMenu,
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
import { ErrorAlert } from "../alert/alert";
import { EditIcon } from "../icons/table/edit-icon";
import Cookies from "js-cookie";
import { formatCurrency } from "@/helpers/format";
export const EditWargas = ({
  items,
}: {
  items: ListWargaType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [wargaDetails, setWargaDetails] = useState<ListWargaType | null>(null);
  const [namaWarga, setNamaWarga] = useState<string>(items.nama_warga);
  const [blokRumah, setBlokRumah] = useState<string>(items.blok_rumah);
  const [nomorRumah, setNomorRumah] = useState<string>(items.nomor_rumah);
  const [nomorHp, setNomorHp] = useState<string>(items.nomor_hp);
  const [jenisKelamin, setJenisKelamin] = useState<string>(items.jenis_kelamin);
  const [statusPernikahan, setStatusPernikahan] = useState<string>(
    items.status_pernikahan
  );
  const [email, setEmail] = useState<string>(items.email);
  const [isRt, setIsRt] = useState<boolean>(items.is_rt);
  const [isRw, setIsRw] = useState<boolean>(items.is_rw);
  const [idRt, setIdRt] = useState<string>(items.id_rt);
  const [idRw, setIdRw] = useState<string>(items.id_rw);
  const [biayaIpl, setBiayaIpl] = useState<string>(items.biaya_ipl);
  const [biayaPenambahan, setBiayaPenambahan] = useState<string>(
    items.biaya_penambahan
  );
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorrMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setWargaDetails(items);
    setNamaWarga(items.nama_warga);
    setBlokRumah(items.blok_rumah);
    setNomorRumah(items.nomor_rumah);
    setNomorHp(items.nomor_hp);
    setJenisKelamin(items.jenis_kelamin);
    setStatusPernikahan(items.status_pernikahan);
    onOpen();
  };
  const handleNamaWargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamaWarga(e.target.value);
  };

  const handleBlokRumahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlokRumah(e.target.value);
  };

  const handleNomorRumahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomorRumah(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNomorHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomorHp(e.target.value);
  };
  const handleJenisKelaminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJenisKelamin(e.target.value);
  };
  const handleStatusPernikahanChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStatusPernikahan(e.target.value);
  };
  const handleIdRtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRt(e.target.value === "RT");
  };
  const handleIdRwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRw(e.target.value === "RW");
  };
  const handleBiayaIplChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBiayaIpl(e.target.value);
  };
  const handleBiayaPenambahanChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBiayaPenambahan(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetchData(EditWarga, {
        id_warga: wargaDetails?.id_warga,
        nama_warga: namaWarga,
        blok_rumah: blokRumah,
        nomor_rumah: nomorRumah,
        nomor_hp: nomorHp,
        jenis_kelamin: jenisKelamin,
        id_perumahan: Cookies.get("id_perumahan"),
        status_pernikahan: statusPernikahan,
        email: email,
        is_rt: isRt,
        is_rw: isRw,
        id_rt: idRt,
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
                  value={namaWarga}
                  variant="bordered"
                  onChange={handleNamaWargaChange}
                />
                <Input
                  label="Blok Rumah"
                  value={blokRumah}
                  variant="bordered"
                  onChange={handleBlokRumahChange}
                />
                <Input
                  label="Nomor Rumah"
                  value={nomorRumah}
                  variant="bordered"
                  onChange={handleNomorRumahChange}
                />
                <Input
                  label="Email"
                  value={email}
                  variant="bordered"
                  onChange={handleEmailChange}
                />
                <Input
                  label="Nomor HP"
                  value={nomorHp}
                  variant="bordered"
                  onChange={handleNomorHpChange}
                />
                <Input
                  label="Biaya IPL"
                  value={formatCurrency(Number(biayaIpl))}
                  variant="bordered"
                  onChange={handleBiayaIplChange}
                />
                <Input
                  label="Biaya Penambahan"
                  value={formatCurrency(Number(biayaPenambahan))}
                  variant="bordered"
                  onChange={handleBiayaPenambahanChange}
                />
                <Dropdown>
                  <DropdownTrigger>
                    <Input
                      label="Jenis Kelamin"
                      value={jenisKelamin}
                      variant="bordered"
                      readOnly
                    />
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Jenis Kelamin Options"
                    onAction={(key) => setJenisKelamin(key.toString())}
                  >
                    <DropdownItem key="Laki-Laki">Laki-Laki</DropdownItem>
                    <DropdownItem key="Perempuan">Perempuan</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
