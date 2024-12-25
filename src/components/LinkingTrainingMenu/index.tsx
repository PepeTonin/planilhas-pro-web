import { RefObject, useEffect } from "react";
import PrimaryButton from "../PrimaryButton";

interface LinkingTrainingMenuProps {
  innerRef: RefObject<HTMLDivElement>;
  setIsLinkingMenuOpen: (value: boolean) => void;
  linkToStudent: () => void;
  linkToExistingWorkoutPlan: () => void;
  linkToNewWorkoutPlan: () => void;
  isBtnLoading?: boolean;
}

export default function LinkingTrainingMenu({
  innerRef,
  setIsLinkingMenuOpen,
  linkToStudent,
  linkToExistingWorkoutPlan,
  linkToNewWorkoutPlan,
  isBtnLoading,
}: LinkingTrainingMenuProps) {
  const handleClickOutside = (event: MouseEvent) => {
    if (innerRef.current && !innerRef.current.contains(event.target as Node)) {
      setIsLinkingMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={innerRef}
      className="absolute right-[248px] bottom-[80px] w-52 bg-white-f5 rounded-lg p-2 gap-2 flex flex-col"
    >
      <PrimaryButton
        variation="light-gray-bg"
        fullWidth
        label="De aluno"
        onClick={linkToStudent}
        isLoading={isBtnLoading}
      />
      <PrimaryButton
        variation="light-gray-bg"
        fullWidth
        label="Planilha existente"
        onClick={linkToExistingWorkoutPlan}
        isLoading={isBtnLoading}
      />
      <PrimaryButton
        variation="light-gray-bg"
        fullWidth
        label="Nova planilha"
        onClick={linkToNewWorkoutPlan}
        isLoading={isBtnLoading}
      />
    </div>
  );
}
