import { useRef, useState } from "react";

import LinkingTrainingMenu from "../LinkingTrainingMenu";
import PrimaryButton from "../PrimaryButton";

interface ContentFooterProps {
  variation: "planilha" | "treino";
  handleSave: () => void;
  handleLink?: () => void;
  handleStudentLink?: () => void;
  handleExistingWorkoutPlan?: () => void;
  handleNewWorkoutPlan?: () => void;
}

export default function ContentFooter({
  variation,
  handleSave,
  handleLink,
  handleStudentLink,
  handleExistingWorkoutPlan,
  handleNewWorkoutPlan,
}: ContentFooterProps) {
  const linkingMenuRef = useRef<HTMLDivElement>(null);

  const [isLinkingMenuOpen, setIsLinkingMenuOpen] = useState(false);

  const VariationObject = {
    planilha: {
      linkButtonLabel: "Vincular a aluno",
      saveButtonLabel: "Salvar planilha",
    },
    treino: {
      linkButtonLabel: "Vincular a planilha",
      saveButtonLabel: "Salvar treino",
    },
  };

  const hasLinkingMenu =
    variation === "treino" &&
    !!handleStudentLink &&
    !!handleExistingWorkoutPlan &&
    !!handleNewWorkoutPlan;

  return (
    <footer className="w-full flex flex-row justify-end gap-4">
      {hasLinkingMenu && isLinkingMenuOpen && (
        <LinkingTrainingMenu
          innerRef={linkingMenuRef}
          setIsLinkingMenuOpen={setIsLinkingMenuOpen}
          linkToStudent={handleStudentLink}
          linkToExistingWorkoutPlan={handleExistingWorkoutPlan}
          linkToNewWorkoutPlan={handleNewWorkoutPlan}
        />
      )}
      <PrimaryButton
        label={VariationObject[variation].linkButtonLabel}
        onClick={
          variation === "treino"
            ? () => setIsLinkingMenuOpen(!isLinkingMenuOpen)
            : handleLink || (() => {})
        }
        variation="white-bg"
      />
      <PrimaryButton
        label={VariationObject[variation].saveButtonLabel}
        onClick={handleSave}
      />
    </footer>
  );
}
