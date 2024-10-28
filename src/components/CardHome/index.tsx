import { CardHomeStatus } from "@/utils/sharedTypes";
import { LinkSquare01Icon, ArrowRight04Icon } from "hugeicons-react";

interface CardHomeProps {
  name: string;
  status?: CardHomeStatus;
  id: number;
  onExternalLinkClick: (id: number) => void;
}

export default function CardHome({
  name,
  status,
  id,
  onExternalLinkClick,
}: CardHomeProps) {
  const statusText = {
    [CardHomeStatus.PaymentOverdue]: "Pagamento em atraso",
    [CardHomeStatus.TrainingPending]: "Treinamento pendente",
    [CardHomeStatus.SupportNeeded]: "Suporte necessário",
  };

  const statusBgColor = {
    [CardHomeStatus.PaymentOverdue]: "bg-red",
    [CardHomeStatus.TrainingPending]: "bg-yellow",
    [CardHomeStatus.SupportNeeded]: "bg-yellow",
  };

  return (
    <div
      className={`${
        status ? statusBgColor[status] : "bg-white-f5"
      } flex flex-row justify-between items-center w-full py-2 px-4 rounded-lg`}
    >
      {status ? (
        <div className="flex flex-row justify-center items-center gap-2 text-primaryDarkBg font-semibold">
          <p>{name}</p>
          <ArrowRight04Icon className="text-primaryDarkBg" size={24} />
          <p>{statusText[status]}</p>
        </div>
      ) : (
        <div className="text-primaryDarkBg font-semibold">
          <p>{name}</p>
        </div>
      )}
      <div>
        <LinkSquare01Icon
          className="text-primaryDarkBg cursor-pointer"
          size={24}
          onClick={() => onExternalLinkClick(id)}
        />
      </div>
    </div>
  );
}
