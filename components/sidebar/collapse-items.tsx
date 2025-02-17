"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "../icons/sidebar/chevron-down-icon";
import { Accordion, AccordionItem } from "@nextui-org/react";
import clsx from "clsx";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";
import { CustomersIcon } from "../icons/sidebar/customers-icon";

interface Props {
  icon: React.ReactNode;
  title: string;
  items: { title: string; pathName: string }[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronDownIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5",

            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-12 max-w-full max-h-full">
            {items.map((item, index) => (
              <span
                key={index}
                className="max-w-full rounded-xl flex text-default-500 hover:text-default-900 hover:bg-default-100 transition-colors max-h-full"
              >
                <SidebarItem
                  isActive={pathname === item.pathName}
                  title={item.title}
                  icon={""}
                />
              </span>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
