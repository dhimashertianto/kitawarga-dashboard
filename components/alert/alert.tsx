import { Alert } from "@heroui/react";

interface ErrorAlertProps {
  title: string;
  color: "danger" | "warning" | "info" | "success"; // You can customize the color types
}

export const ErrorAlert = ({ title, color }: ErrorAlertProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full">
      <div className="flex flex-col w-full p-4">
        <div key={color} className="w-full flex items-center my-3">
          <Alert color={color} title={title} />
        </div>
      </div>
    </div>
  );
};
