import { fetchData, fetchFormData } from "@/actions/api";
import { AddWarga, UploadWarga } from "@/constants/constants";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { ErrorAlert } from "@/components/alert/alert";
import { Spinner } from "@heroui/react";

import { Card } from "@heroui/card";
import { UploadIcon, XIcon } from "lucide-react";

export const AddWargasImport = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleAddWarga = async () => {
    setLoading(true);
    try {
      const id_perumahan = Cookies.get("id_perumahan");
      
      const formData = new FormData();
      formData.append("file", file ?? '');
      formData.append("id_perumahan", id_perumahan ?? '');
      
      await fetchFormData(UploadWarga, formData);

      setErrorMessage("success");
      setIsError(true);
      onClose();
      window.location.reload();
    } catch (error) {
      setErrorMessage("Failed Upload Data");
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
          Import Warga
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
                  Import Warga
                </ModalHeader>
                <ModalBody className="grid gap-4">
                <div className="flex flex-col items-center gap-4 p-6">
                  <Card className="border-dashed border-2 border-gray-300 hover:border-primary-500 transition-all duration-300 p-6 w-full max-w-md text-center rounded-lg">
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <UploadIcon className="text-primary-500 w-10 h-10" />
                      <span className="text-gray-600">Drag & drop or click to upload</span>
                      <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                  </Card>

                  {/* File Preview */}
                  {file && (
                    <Card className="p-4 w-full max-w-md flex items-center gap-4 bg-gray-100 rounded-lg shadow-md">
                      {preview && <img src={preview} alt="Preview" className="w-16 h-16 rounded-md object-cover" />}
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{file.name}</p>
                        <p className="text-gray-500 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <button onClick={handleRemoveFile} className="text-gray-500 hover:text-red-500 transition">
                        <XIcon className="w-5 h-5" />
                      </button>
                    </Card>
                  )}

                  {/* Upload Button */}
                  {/* {file && (
                    <Button
                      variant="solid"
                      color="primary"
                      className="w-full max-w-md"
                      onClick={() => alert(`Uploading: ${file.name}`)}
                    >
                      Upload File
                    </Button>
                  )} */}
                </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Close
                  </Button>
                  {file && (<Button color="primary" onPress={handleAddWarga}>
                    {loading ? <Spinner size="sm" color="white" /> : "Upload & Import Warga"}
                  </Button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
