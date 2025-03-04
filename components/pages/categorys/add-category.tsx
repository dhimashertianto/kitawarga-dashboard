import { fetchData } from "@/actions/api";
import { AddKategori } from "@/constants/constants";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ErrorAlert } from "@/components/alert/alert";

export const AddCategory = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [categoryName, setCategoryName] = useState("");
  const [categoryNote, setCategoryNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddCategory = async () => {
    setLoading(true);
    const id = uuidv4();
    try {
      await fetchData(AddKategori, {
        id_kategori: id,
        nama_kategori_transaksi: categoryName,
        keterangan_kategori_transaksi: categoryNote,
      });
      setErrorMessage("success");
      setIsError(true);
      onClose();
      window.location.reload();
    } catch (error) {
      setErrorMessage("Failed Change a Data");
      setIsError(true);
    } finally {
      setTimeout(() => {
        setErrorMessage("");
        setIsError(false);
      }, 2500);
      setLoading(false);
    }
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Add Category
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          size="2xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                {isError && <ErrorAlert title={errorMessage} color="danger" />}
                <ModalHeader className="flex flex-col gap-1">
                  Add Category
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Name Category"
                    variant="bordered"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <Input
                    label="Note Category"
                    variant="bordered"
                    value={categoryNote}
                    onChange={(e) => setCategoryNote(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleAddCategory}>
                    Add Category
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
