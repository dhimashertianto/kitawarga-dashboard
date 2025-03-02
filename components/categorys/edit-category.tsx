import { fetchData } from "@/actions/api";
import { EditKategori, EditPerumahan } from "@/constants/constants";
import { ListCategoryType } from "@/helpers/types";
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
import { ErrorAlert } from "../alert/alert";
import { EditIcon } from "../icons/table/edit-icon";

export const EditCategory = ({
  items,
}: {
  items: ListCategoryType;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryDetails, setCategoryDetails] =
    useState<ListCategoryType | null>(null);
  const [namaCategory, setNamaCategory] = useState<string>(
    items.nama_kategori_transaksi
  );
  const [keteranganCategory, setKeteranganCategory] = useState<string>(
    items.keterangan_kategori_transaksi
  );
  const [loading, setLoading] = useState(false);
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorrMessage, setIsEditErrorMessage] = useState("");

  const handleViewDetails = () => {
    setCategoryDetails(items);
    setNamaCategory(items.nama_kategori_transaksi);
    setKeteranganCategory(items.keterangan_kategori_transaksi);
    onOpen();
  };

  const handleNamaCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamaCategory(e.target.value);
  };

  const handleKeteranganCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeteranganCategory(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);    
    try {
      await fetchData(EditKategori, {
        id_kategori: categoryDetails?.id_kategori,
        nama_kategori_transaksi: namaCategory,
        keterangan_kategori_transaksi: keteranganCategory,
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
            Category Details
          </ModalHeader>
          <ModalBody>
            {categoryDetails ? (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ID"
                  className="max-w-xs"
                  value={categoryDetails.id_kategori}
                  variant="flat"
                  readOnly
                />
                <Input
                  label="Nama Category"
                  value={namaCategory}
                  variant="bordered"
                  onChange={handleNamaCategoryChange}
                />
                <Input
                  label="Keterangan Category"
                  value={keteranganCategory}
                  variant="bordered"
                  onChange={handleKeteranganCategoryChange}
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
