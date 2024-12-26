import { useRef, useState } from "react";
import { PlusSignSquareIcon, ArrowDown01Icon } from "hugeicons-react";

import { TrainCategory } from "@/types/treino";
import { WorkoutPlanModel } from "@/types/workoutPlan";

import CategoriesMenu from "../CategoriesMenu";
import CategoryTag from "../CategoryTag";
import ModelsMenu from "../ModelsMenu";

interface ContentHeaderProps {
  variation: "planilha" | "treino";
  selectedCategories: TrainCategory[];
  handleRemoveCategoryFromSelected: (categoryId: number) => void;
  handleSelectCategory: (category: TrainCategory) => void;
  categories: TrainCategory[];
  models?: WorkoutPlanModel[];
  isLoadingModels?: boolean;
  selectedModel?: WorkoutPlanModel;
  handleSelectModel?: (model: WorkoutPlanModel) => void;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

export default function ContentHeader({
  variation,
  selectedCategories,
  handleRemoveCategoryFromSelected,
  handleSelectCategory,
  categories,
  models,
  isLoadingModels,
  selectedModel,
  handleSelectModel,
  title,
  setTitle,
  description,
  setDescription,
}: ContentHeaderProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const modelsRef = useRef<HTMLDivElement>(null);

  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);

  const [isModelsMenuOpen, setIsModelsMenuOpen] = useState(false);

  function toggleCategoriesMenu() {
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
  }

  function toggleModelsMenu() {
    setIsModelsMenuOpen(!isModelsMenuOpen);
  }

  const VariationObject = {
    planilha: {
      contentTitle: "Nova planilha",
      titlePlaceholder: "Título da planilha",
      descriptionPlaceholder: "Descrição da planilha",
    },
    treino: {
      contentTitle: "Novo treino",
      titlePlaceholder: "Título do treino",
      descriptionPlaceholder: "Descrição do treino",
    },
  };

  return (
    <header className="flex flex-col gap-1">
      <p className="font-bold text-primaryGreen text-3xl">
        {VariationObject[variation].contentTitle}
      </p>
      <div className="flex flex-row gap-2 text-white-f5 font-semibold text-lg">
        <p onClick={() => titleRef.current?.focus()}>Título: </p>
        <input
          className="bg-transparent outline-none text-white-f5 min-w-10 max-h-full placeholder:text-gray-medium"
          ref={titleRef}
          placeholder={VariationObject[variation].titlePlaceholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-2 text-gray-light font-medium text-lg">
        <p onClick={() => descriptionRef.current?.focus()}>Descrição: </p>
        <input
          className="flex-1 bg-transparent outline-none text-white-f5 min-w-10 max-h-full placeholder:text-gray-medium caret-gray-medium"
          ref={descriptionRef}
          placeholder={VariationObject[variation].descriptionPlaceholder}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {/* <div className="flex flex-row gap-1 text-gray-light font-medium text-lg items-center">
        <p>Categorias: </p>

        {selectedCategories &&
          selectedCategories.length > 0 &&
          selectedCategories.map((category) => (
            <CategoryTag
              label={category.label}
              key={category.id}
              id={category.id}
              removeCategory={handleRemoveCategoryFromSelected}
            />
          ))}

        {(!selectedCategories || selectedCategories.length < 4) && (
          <PlusSignSquareIcon
            className="cursor-pointer"
            onClick={toggleCategoriesMenu}
          />
        )}

        {isCategoriesMenuOpen && (
          <CategoriesMenu
            data={categories}
            innerRef={menuRef}
            setIsCategoriesMenuOpen={setIsCategoriesMenuOpen}
            onSelectCategory={handleSelectCategory}
          />
        )}
      // </div> */}
      {variation === "planilha" && (
        <>
          <div className="flex flex-row gap-2 text-gray-light font-medium text-lg">
            <p>Modelo: </p>
            <div
              onClick={toggleModelsMenu}
              className="flex flex-row items-center gap-2 cursor-pointer bg-white-f5 rounded-md px-2 w-[400px]"
            >
              <p className="flex-1 line-clamp-1">
                {selectedModel ? selectedModel.title : "Selecione um modelo"}
              </p>
              <ArrowDown01Icon />
            </div>
          </div>
          {isModelsMenuOpen && models && handleSelectModel && (
            <ModelsMenu
              models={models}
              innerRef={modelsRef}
              onSelect={handleSelectModel}
              setIsModelsMenuOpen={setIsModelsMenuOpen}
            />
          )}
        </>
      )}
    </header>
  );
}
