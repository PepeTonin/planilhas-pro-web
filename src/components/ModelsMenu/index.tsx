import { RefObject, useEffect } from "react";
import { Spinner } from "@nextui-org/spinner";

import { WorkoutPlanModel } from "@/types/workoutPlan";

interface ModelsMenuProps {
  models: WorkoutPlanModel[];
  isLoadingModels?: boolean;
  innerRef: RefObject<HTMLDivElement>;
  onSelect: (option: WorkoutPlanModel) => void;
  setIsModelsMenuOpen: (value: boolean) => void;
}

export default function ModelsMenu({
  models,
  isLoadingModels = false,
  innerRef,
  onSelect,
  setIsModelsMenuOpen,
}: ModelsMenuProps) {
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event: MouseEvent) {
    if (innerRef.current && !innerRef.current.contains(event.target as Node)) {
      setIsModelsMenuOpen(false);
    }
  }

  function handleSelectModel(model: WorkoutPlanModel) {
    onSelect(model);
    setIsModelsMenuOpen(false);
  }

  return (
    <div
      className="absolute w-[400px] left-[342px] top-[244px] flex flex-col bg-white-f5 rounded-md p-2"
      ref={innerRef}
    >
      {isLoadingModels && (
        <div className="flex-1 justify-center items-center">
          <Spinner color="secondary" />
        </div>
      )}
      {!isLoadingModels &&
        models.map((model) => (
          <div key={model.id} onClick={() => handleSelectModel(model)}>
            <p className="text-sm line-clamp-1 text-primaryDarkBg font-medium cursor-pointer hover:opacity-60">
              {model.title}
            </p>
          </div>
        ))}
    </div>
  );
}
