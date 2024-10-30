import { SubGroup } from "@/utils/sharedTypes";
import { PlusSignSquareIcon } from "hugeicons-react";

import Icon from "./Icon";

import { ISelectedItem } from "../Layout/Sidebar";

interface AccordionProps {
  id: number;
  label: string;
  innerItems: SubGroup[];
  openedAccordionItem: number;
  onAccordionArrowIconClick: (id: number) => void;
  onGroupClick: (id: number) => void;
  onSubGroupClick: (parentId: number, itemId: number) => void;
  selectedItem: ISelectedItem;
}

export default function Accordion({
  id,
  label,
  innerItems,
  openedAccordionItem,
  onAccordionArrowIconClick,
  onGroupClick,
  onSubGroupClick,
  selectedItem,
}: AccordionProps) {
  return (
    <div className="flex flex-col justify-center items-center text-white-f5 w-full hover:cursor-pointer">
      <div className="flex flex-row w-full justify-between items-center">
        <Icon
          id={id}
          open={openedAccordionItem}
          onClick={() => onAccordionArrowIconClick(id)}
        />
        <p
          className={`${
            selectedItem.parentId === id && "text-primaryGreen"
          } flex-1 text-left pl-4 font-semibold text-lg truncate`}
          onClick={() => onGroupClick(id)}
        >
          {label}
        </p>
        <PlusSignSquareIcon
          onClick={() => console.log("plus sign click", id)}
        />
      </div>
      {id === openedAccordionItem && innerItems.length > 0 && (
        <div className="flex flex-col text-gray-light font-medium text-sm gap-2">
          {innerItems.map((item) => {
            return (
              <p
                className={`${
                  selectedItem.parentId === id &&
                  selectedItem.itemId === item.id &&
                  "text-primaryGreen font-semibold"
                } truncate w-40 ms-5 hover:cursor-pointer first-of-type:pt-2`}
                key={item.id}
                onClick={() => onSubGroupClick(id, item.id)}
              >
                {item.label}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
