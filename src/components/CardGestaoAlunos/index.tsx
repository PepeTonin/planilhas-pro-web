import { LinkSquare01Icon } from "hugeicons-react";

import { PaymentStatus } from "@/types/notifications";

import Tag from "./Tag";

interface CardGestaoAlunosProps {
  id: number;
  name: string;
  groupName?: string;
  subGroupName?: string;
  paymentStatus: PaymentStatus;
  onExternalLinkClick: (id: number) => void;
}

export default function CardGestaoAlunos({
  id,
  name,
  groupName,
  subGroupName,
  paymentStatus,
  onExternalLinkClick,
}: CardGestaoAlunosProps) {
  console.log(subGroupName);

  return (
    <div className="flex flex-row items-center justify-between bg-white-f5 rounded-lg px-4 py-2">
      <div className="flex flex-row items-center justify-center gap-4">
        <p className="text-lg font-semibold text-primaryDarkBg">{name}</p>
        <div className="flex flex-row items-center justify-center gap-1">
          <p className="text-sm font-semibold text-gray-medium">{groupName}</p>
          <p className="text-sm font-semibold text-gray-medium">
            {subGroupName}
          </p>
        </div>
        <Tag paymentStatus={paymentStatus} />
      </div>
      <LinkSquare01Icon
        className="text-primaryDarkBg cursor-pointer"
        onClick={() => onExternalLinkClick(id)}
      />
    </div>
  );
}
