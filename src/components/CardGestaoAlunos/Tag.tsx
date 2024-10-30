import { PaymentStatus } from "@/utils/sharedTypes";

interface TagProps {
  paymentStatus: PaymentStatus;
}

export default function Tag({ paymentStatus }: TagProps) {
  const tagBgColorObject = {
    active: "bg-primaryGreen",
    inactive: "bg-red",
    overdue: "bg-yellow",
  };

  const tagTexts = {
    active: "ATIVO",
    inactive: "INATIVO",
    overdue: "EM ATRASO",
  };

  return (
    <div className={`${tagBgColorObject[paymentStatus]} py-1 px-4 rounded-full`}>
      <p className="text-primaryDarkBg font-semibold text-xs">{tagTexts[paymentStatus]}</p>
    </div>
  );
}
