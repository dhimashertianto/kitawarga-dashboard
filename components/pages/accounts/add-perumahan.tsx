import {
  Button,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Dropdown,
  DropdownItem,
  DropdownMenu
} from "@nextui-org/react";
import React, { useState } from "react";
import { ErrorAlert } from "@/components/alert/alert";
import { v4 as uuidv4 } from "uuid";
import { fetchData } from "@/actions/api";
import { Spinner } from "@heroui/spinner";
import { AddPerumahanUrl } from "@/constants/constants";


export const AddPerumahan = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isEditError, setIsEditError] = useState(false);
  const [isEditErrorrMessage, setIsEditErrorMessage] = useState("");
  // perumahan
  const [namaPerumahan, setNamaPerumahan] = useState("");
  const [alamatPerumahan, setAlamatPerumahan] = useState("");
  const [linkCctv, setLinkCctv] = useState("");
  const [linkImgQr, setLinkImgQr] = useState("");
  const [saldoPerumahan, setSaldoPerumahan] = useState(0);
  const [alamatMaps, setAlamatMaps] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [skemaBayar, setSkemaBayar] = useState("Fixed");

  const handleAddPerumahan = async () => {
    // Validate required fields
    const requiredFields = {
      "nama_perumahan": namaPerumahan,
      "alamat_perumahan": alamatPerumahan,
      "link_cctv": "-",
      "link_img_qr": "-",
      "saldo_perumahan": saldoPerumahan,
      "alamat_maps": alamatMaps,
      "bank_code": bankCode,
      "account_holder_name": accountHolderName,
      "account_number": accountNumber,
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
      await fetchData(AddPerumahanUrl, {
        id_perumahan: id,
        nama_perumahan: namaPerumahan,
        alamat_perumahan: alamatPerumahan,
        link_cctv: "=",
        link_img_qr: "-",
        saldo_perumahan: saldoPerumahan,
        alamat_maps: alamatMaps,
        bank_code: bankCode,
        account_holder_name: accountHolderName,
        account_number: accountNumber,
        status_account: "0",
        skema_bayar: skemaBayar === 'Fixed' ? '1' : '2',
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
          Add Perumahan
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
                  Add Perumahan
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Nama Perumahan"
                    value={namaPerumahan}
                    onChange={(e) => setNamaPerumahan(e.target.value)}
                    variant="bordered" />

                  <Input
                    label="Alamat Perumahan"
                    value={alamatPerumahan}
                    onChange={(e) => setAlamatPerumahan(e.target.value)}
                    variant="bordered" />

                  <Input
                    label="Saldo Perumahan"
                    value={saldoPerumahan.toString()}
                    onChange={(e) => setSaldoPerumahan(parseInt(e.target.value))}
                    variant="bordered" />

                  <Input
                    label="Alamat Maps Perumahan"
                    value={alamatMaps}
                    onChange={(e) => setAlamatMaps(e.target.value)}
                    variant="bordered" />

                  <Input
                    label="Bank Code"
                    value={bankCode}
                    onChange={(e) => setBankCode(e.target.value)}
                    variant="bordered" />

                  <Input
                    label="Account Holder Name"
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    variant="bordered" />

                  <Input
                    label="Account Number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    variant="bordered" />

                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="w-full justify-start text-left h-14 min-h-unit-14 py-2"
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-xs text-default-500">
                            Skema Bayar
                          </span>
                          <span>
                            {skemaBayar || "Pilih Skema Pembayaran"}
                          </span>
                        </div>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Status Pernikahan Options"
                      onAction={(key) =>
                        setSkemaBayar(key.toString())
                      }
                    >
                      <DropdownItem key="Fixed">Fixed</DropdownItem>
                      <DropdownItem key="Persentase">Persentase</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleAddPerumahan}>
                    {loading ? <Spinner size="sm" color="white" /> : "Add Perumahan"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div >
  );
};
