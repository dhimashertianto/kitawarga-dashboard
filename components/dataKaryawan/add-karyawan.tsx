import { fetchData } from "@/actions/api";
import { AddKaryawan as AddKaryawanApi } from "@/constants/constants";
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
import Cookies from "js-cookie";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ErrorAlert } from "../alert/alert";

export const AddKaryawan = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [addKaryawanName, setAddKaryawanName] = useState("");
  const [addKaryawanGajiPokok, setAddKaryawanGajiPokok] = useState("");
  const [addKaryawanPosisi, setAddKaryawanPosisi] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddKaryawan = async () => {
    const requiredFields = {
      "Nama Karyawan": addKaryawanName,
      Posisi: addKaryawanPosisi,
      "Gaji Pokok": addKaryawanGajiPokok,
    };

    const emptyFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setErrorMessage(
        `Please fill in the following fields: ${emptyFields.join(", ")}`
      );
      setIsError(true);
      setTimeout(() => {
        setErrorMessage("");
        setIsError(false);
      }, 2500);
      return;
    }

    setLoading(true);
    const id = uuidv4();
    try {
      await fetchData(AddKaryawanApi, {
        id_karyawan: id,
        nama_karyawan: addKaryawanName,
        id_perumahan: Cookies.get("id_perumahan"),
        posisi: addKaryawanPosisi,
        gaji_bulanan: addKaryawanGajiPokok,
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
          Add Karyawan
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
          size="2xl"
          backdrop="blur"
        >
          <ModalContent>
            {(onClose) => (
              <>
                {isError && <ErrorAlert title={errorMessage} color="danger" />}
                <ModalHeader className="flex flex-col gap-1">
                  Add Karyawan
                </ModalHeader>
                <ModalBody className="grid grid-cols-2 gap-4">
                  <Input
                    label="Nama Karyawan"
                    variant="bordered"
                    value={addKaryawanName}
                    onChange={(e) => setAddKaryawanName(e.target.value)}
                  />
                  <Input
                    label="Posisi"
                    variant="bordered"
                    value={addKaryawanPosisi}
                    onChange={(e) => setAddKaryawanPosisi(e.target.value)}
                  />
                  <Input
                    label="Gaji Pokok"
                    variant="bordered"
                    value={addKaryawanGajiPokok}
                    onChange={(e) => setAddKaryawanGajiPokok(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleAddKaryawan}>
                    Add Karyawan
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
