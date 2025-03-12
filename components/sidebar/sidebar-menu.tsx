import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
  isHide?: boolean;
}

export const SidebarMenu = ({ title, children, isHide }: Props) => {
  if (isHide) {
    return null;
  }
  return (
    <div className="flex gap-2 flex-col">
      <span className="text-xs font-normal ">{title}</span>
      {children}
    </div>
  );
};
