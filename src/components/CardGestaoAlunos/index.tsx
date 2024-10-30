import { LinkSquare01Icon } from "hugeicons-react";
import Tag from "./Tag";
import { PaymentStatus } from "@/utils/sharedTypes";

import { mockedGroups } from "@/data/mockedData";

interface CardGestaoAlunosProps {
  id: number;
  name: string;
  groupId: number;
  subGroupId: number;
  paymentStatus: PaymentStatus;
  onExternalLinkClick: (id: number) => void;
}

export default function CardGestaoAlunos({
  id,
  name,
  groupId,
  subGroupId,
  paymentStatus,
  onExternalLinkClick,
}: CardGestaoAlunosProps) {
  const groupName = mockedGroups.find((group) => group.id === groupId)?.label;

  const subGroupName = mockedGroups
    .find((group) => group.id === subGroupId)
    ?.subGroups.find((subGroup) => subGroup.id === subGroupId)?.label;

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
