import { PlusSignSquareIcon } from "hugeicons-react";

import Icon from "./Icon";

import { ISelectedItem, ModalType } from "../Layout/Sidebar";
import { FetchedSubGroup } from "@/types/groups";

interface AccordionProps {
  id: number;
  label: string;
  innerItems: FetchedSubGroup[];
  openedAccordionItem: number;
  onAccordionArrowIconClick: (id: number) => void;
  onGroupClick: (id: number) => void;
  onSubGroupClick: (parentId: number, itemId: number) => void;
  selectedItem: ISelectedItem;
  onPlusSignClick: (modalType: ModalType, parentGroupId: number) => void;
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
  onPlusSignClick,
}: AccordionProps) {
  return (
    <div className="flex flex-col justify-center items-center text-white-f5 w-full">
      <div className="flex flex-row w-full justify-between items-center">
        <Icon
          id={id}
          open={openedAccordionItem}
          onClick={() => onAccordionArrowIconClick(id)}
        />
        <p
          className={`${
            selectedItem.parentId === id && "text-primaryGreen"
          } flex-1 text-left pl-4 font-semibold text-lg truncate cursor-pointer hover:opacity-80`}
          onClick={() => onGroupClick(id)}
        >
          {label}
        </p>
        <PlusSignSquareIcon
          onClick={() => onPlusSignClick(ModalType.CREATE_SUBGROUP, id)}
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
                {item.nome}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
