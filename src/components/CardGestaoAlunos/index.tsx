import { LinkSquare01Icon, ArrowRight04Icon } from "hugeicons-react";
import Tag from "./Tag";

interface CardGestaoAlunosProps {
  id: number;
  name: string;
  group: string;
  subGroup: string;
  paymentStatus: "active" | "inactive" | "overdue";
  onExternalLinkClick: (id: number) => void;
}

export default function CardGestaoAlunos({
  id,
  name,
  group,
  subGroup,
  paymentStatus,
  onExternalLinkClick,
}: CardGestaoAlunosProps) {
  return (
    <div className="flex flex-row items-center justify-between bg-white-f5 rounded-lg px-4 py-2">
      <div className="flex flex-row items-center justify-center gap-4">
        <p className="text-lg font-semibold text-primaryDarkBg">{name}</p>
        <div className="flex flex-row items-center justify-center gap-1">
          <p className="text-sm font-semibold text-gray-medium">{group}</p>
          <ArrowRight04Icon className="text-gray-medium" size={20} />
          <p className="text-sm font-semibold text-gray-medium">{subGroup}</p>
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
