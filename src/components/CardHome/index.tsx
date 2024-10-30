import { GeneralStatus, PaymentStatus } from "@/utils/sharedTypes";
import { LinkSquare01Icon, ArrowRight04Icon } from "hugeicons-react";

interface CardHomeProps {
  id: number;
  name: string;
  generalStatus?: GeneralStatus;
  paymentStatus?: PaymentStatus;
  onClick: (id: number) => void;
}

export default function CardHome({
  id,
  name,
  generalStatus,
  paymentStatus,
  onClick,
}: CardHomeProps) {
  const statusText = {
    [PaymentStatus.Overdue]: "Pagamento em atraso",
    [GeneralStatus.TrainingPending]: "Treinamento pendente",
    [GeneralStatus.SupportNeeded]: "Suporte necessário",
  };

  const statusBgColor = {
    [PaymentStatus.Overdue]: "bg-red",
    [GeneralStatus.TrainingPending]: "bg-yellow",
    [GeneralStatus.SupportNeeded]: "bg-yellow",
  };

  return (
    <div
      onClick={() => onClick(id)}
      className={`${
        paymentStatus === PaymentStatus.Overdue
          ? statusBgColor[paymentStatus]
          : generalStatus
          ? statusBgColor[generalStatus]
          : "bg-white-f5"
      } flex flex-row justify-between items-center w-full py-2 px-4 rounded-lg cursor-pointer`}
    >
      <div className="flex flex-row items-end gap-4">
        <p className="text-primaryDarkBg font-semibold">{name}</p>
        {paymentStatus === PaymentStatus.Overdue && (
          <p className="text-sm text-gray-dark font-bold decoration-slice">
            {statusText[paymentStatus]}
          </p>
        )}
        {generalStatus && (
          <p className="text-xs text-gray-dark font-semibold">{statusText[generalStatus]}</p>
        )}
      </div>
      <LinkSquare01Icon
        className="text-primaryDarkBg cursor-pointer self-end"
        size={24}
      />
    </div>
  );
}
