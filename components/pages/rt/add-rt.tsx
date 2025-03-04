import { fetchData } from "@/actions/api";
import { AddRt as AddRtApi } from "@/constants/constants";
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
import { ErrorAlert } from "@/components/alert/alert";

export const AddRt = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [addRtName, setAddRtName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddRt = async () => {
    const requiredFields = {
      "Nomor RT": addRtName,
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
      await fetchData(AddRtApi, {
        id_rt: id,
        nomor_rt: addRtName,
        id_rw: Cookies.get("id_rw"),
      });
      setErrorMessage("success");
      setIsError(true);
      onClose();
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        setIsError(true);
        setErrorMessage(error.message);
      } else {
        setIsError(true);
        setErrorMessage("An unknown error occurred");
      }
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
          Add RT
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
                  Add RT
                </ModalHeader>
                <ModalBody className="grid grid-cols-2 gap-4">
                  <Input
                    label="Nomor RT"
                    variant="bordered"
                    value={addRtName}
                    onChange={(e) => setAddRtName(e.target.value)}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleAddRt}>
                    Add RT
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
