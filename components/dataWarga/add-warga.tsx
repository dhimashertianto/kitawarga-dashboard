import { fetchData } from "@/actions/api";
import { AddWarga } from "@/constants/constants";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import Cookies from "js-cookie";
import { ErrorAlert } from "../alert/alert";
import { formatCurrency } from "@/helpers/format";
export const AddWargas = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [addWargaName, setAddWargaName] = useState("");
  const [addWargaBlokRumah, setAddWargaBlokRumah] = useState("");
  const [addWargaNomorRumah, setAddWargaNomorRumah] = useState("");
  const [addWargaNomorHp, setAddWargaNomorHp] = useState("");
  const [addWargaJenisKelamin, setAddWargaJenisKelamin] = useState("");
  const [addWargaEmail, setAddWargaEmail] = useState("");
  const [addWargaStatusPernikahan, setAddWargaStatusPernikahan] = useState("");
  const [addWargaBiayaIpl, setAddWargaBiayaIpl] = useState("");
  const [addWargaBiayaPenambahan, setAddWargaBiayaPenambahan] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddWarga = async () => {
    // Validate required fields
    const requiredFields = {
      "Nama Warga": addWargaName,
      Email: addWargaEmail,
      "Nomor HP": addWargaNomorHp,
      "Nomor Rumah": addWargaNomorRumah,
      "Blok Rumah": addWargaBlokRumah,
      "Status Pernikahan": addWargaStatusPernikahan,
      "Jenis Kelamin": addWargaJenisKelamin,
      "Biaya IPL": addWargaBiayaIpl,
      "Biaya Penambahan": addWargaBiayaPenambahan,
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
      await fetchData(AddWarga, {
        id_warga: id,
        nama_warga: addWargaName,
        id_perumahan: Cookies.get("id_perumahan"),
        blok_rumah: addWargaBlokRumah,
        nomor_rumah: addWargaNomorRumah,
        email: addWargaEmail,
        nomor_hp: addWargaNomorHp,
        is_rt: false,
        is_rw: false,
        id_rt: "8c398a4a-3428-11ee-be56-0242ac120002",
        id_rw: "381a8afe-3428-11ee-be56-0242ac120002",
        jenis_kelamin: addWargaJenisKelamin,
        status_pernikahan: addWargaStatusPernikahan,
        biaya_ipl: addWargaBiayaIpl,
        biaya_penambahan: addWargaBiayaPenambahan,
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
          Add Warga
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
                  Add Warga
                </ModalHeader>
                <ModalBody className="grid grid-cols-2 gap-4">
                  <Input
                    label="Nama Warga"
                    variant="bordered"
                    value={addWargaName}
                    onChange={(e) => setAddWargaName(e.target.value)}
                  />
                  <Input
                    label="Blok Rumah"
                    variant="bordered"
                    value={addWargaBlokRumah}
                    onChange={(e) => setAddWargaBlokRumah(e.target.value)}
                  />
                  <Input
                    label="Nomor Rumah"
                    variant="bordered"
                    value={addWargaNomorRumah}
                    onChange={(e) => setAddWargaNomorRumah(e.target.value)}
                  />
                  <Input
                    label="Email"
                    variant="bordered"
                    value={addWargaEmail}
                    onChange={(e) => setAddWargaEmail(e.target.value)}
                  />
                  <Input
                    label="Nomor HP"
                    variant="bordered"
                    value={addWargaNomorHp}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      setAddWargaNomorHp(numericValue);
                    }}
                    onKeyPress={(e) => {
                      // Allow only numbers and control keys
                      if (
                        !/[\d]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <Input
                    label="Biaya Penambahan"
                    variant="bordered"
                    value={formatCurrency(Number(addWargaBiayaPenambahan))}
                    onChange={(e) => {
                      // Remove all non-digit characters
                      const numericValue = e.target.value.replace(/\D/g, "");
                      setAddWargaBiayaPenambahan(numericValue);
                    }}
                    onKeyPress={(e) => {
                      // Allow only numbers and control keys
                      if (
                        !/[\d]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <Input
                    label="Biaya IPL"
                    variant="bordered"
                    value={formatCurrency(Number(addWargaBiayaIpl))}
                    onChange={(e) => {
                      // Remove all non-digit characters
                      const numericValue = e.target.value.replace(/\D/g, "");
                      setAddWargaBiayaIpl(numericValue);
                    }}
                    onKeyPress={(e) => {
                      // Allow only numbers and control keys
                      if (
                        !/[\d]/.test(e.key) &&
                        e.key !== "Backspace" &&
                        e.key !== "Delete"
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="w-full justify-start text-left h-14 min-h-unit-14 py-2"
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-xs text-default-500">
                            Status Pernikahan
                          </span>
                          <span>
                            {addWargaStatusPernikahan || "Pilih status"}
                          </span>
                        </div>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Status Pernikahan Options"
                      onAction={(key) =>
                        setAddWargaStatusPernikahan(key.toString())
                      }
                    >
                      <DropdownItem key="Lajang">Lajang</DropdownItem>
                      <DropdownItem key="Menikah">Menikah</DropdownItem>
                      <DropdownItem key="Cerai">Cerai</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="w-full justify-start text-left h-14 min-h-unit-14 py-2"
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-xs text-default-500">
                            Jenis Kelamin
                          </span>
                          <span>
                            {addWargaJenisKelamin || "Pilih Jenis Kelamin"}
                          </span>
                        </div>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Jenis Kelamin Options"
                      onAction={(key) =>
                        setAddWargaJenisKelamin(key.toString())
                      }
                    >
                      <DropdownItem key="Laki-laki">Laki-laki</DropdownItem>
                      <DropdownItem key="Perempuan">Perempuan</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleAddWarga}>
                    Add Warga
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
