import { TrainingStatus, PaymentStatus } from "@/types/notifications";
import { LinkSquare01Icon } from "hugeicons-react";

interface CardHomeProps {
  id: number;
  name: string;
  trainingStatus?: TrainingStatus;
  paymentStatus?: PaymentStatus;
  onClick: (id: number) => void;
}

export default function CardHome({
  id,
  name,
  trainingStatus,
  paymentStatus,
  onClick,
}: CardHomeProps) {
  const statusText = {
    [PaymentStatus.Overdue]: "Pagamento em atraso",
    [TrainingStatus.TrainingPending]: "Treinamento pendente",
    [TrainingStatus.SupportNeeded]: "Suporte necessário",
  };

  const statusBgColor = {
    [PaymentStatus.Overdue]: "bg-red",
    [TrainingStatus.TrainingPending]: "bg-yellow",
    [TrainingStatus.SupportNeeded]: "bg-yellow",
  };

  return (
    <div
      onClick={() => onClick(id)}
      className={`${
        paymentStatus === PaymentStatus.Overdue
          ? statusBgColor[paymentStatus]
          : trainingStatus
          ? statusBgColor[trainingStatus]
          : "bg-white-f5"
      } flex flex-row justify-between items-center w-full py-2 px-4 rounded-lg cursor-pointer hover:opacity-80`}
    >
      <div className="flex flex-row items-end gap-4">
        <p className="text-primaryDarkBg font-semibold">{name}</p>
        {paymentStatus === PaymentStatus.Overdue && (
          <p className="text-sm text-gray-dark font-bold decoration-slice">
            {statusText[paymentStatus]}
          </p>
        )}
        {trainingStatus && (
          <p className="text-xs text-gray-dark font-semibold">
            {statusText[trainingStatus]}
          </p>
        )}
      </div>
      <LinkSquare01Icon
        className="text-primaryDarkBg cursor-pointer self-end"
        size={24}
      />
    </div>
  );
}
