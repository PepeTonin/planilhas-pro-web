import { PaymentStatus } from "@/types/notifications";
interface TagProps {
  paymentStatus: PaymentStatus;
}

export default function Tag({ paymentStatus }: TagProps) {
  const tagBgColorObject = {
    ativo: "bg-primaryGreen",
    inativo: "bg-red",
    atrasado: "bg-yellow",
  };

  const tagTexts = {
    ativo: "ATIVO",
    inativo: "INATIVO",
    atrasado: "EM ATRASO",
  };

  return (
    <div
      className={`${tagBgColorObject[paymentStatus]} py-1 px-4 rounded-full`}
    >
      <p className="text-primaryDarkBg font-semibold text-xs">
        {tagTexts[paymentStatus]}
      </p>
    </div>
  );
}
