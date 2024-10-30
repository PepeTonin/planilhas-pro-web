"use client";
import { useEffect, useRef, useState } from "react";
import {
  PlusSignSquareIcon,
  LinkSquare01Icon,
  PlusSignIcon,
} from "hugeicons-react";

import { TrainCategory } from "@/utils/sharedTypes";

import PrimaryButton from "@/components/PrimaryButton";

import { mockedCategories } from "@/data/mockedData";
import CategoriesMenu from "@/components/CategoriesMenu";
import CategoryTag from "@/components/CategoryTag";

export interface ITreinoRouteParams {
  params: {
    idTreino: string;
  };
}

export default function DetalhesTreino({ params }: ITreinoRouteParams) {
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] =
    useState<boolean>(false);

  const [selectedCategories, setSelectedCategories] =
    useState<TrainCategory[]>();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function toggleMenu() {
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
  }

  function handleSelectCategory(category: TrainCategory) {
    if (
      selectedCategories &&
      (selectedCategories.includes(category) || selectedCategories.length === 4)
    )
      return;
    setSelectedCategories((prev) => (prev ? [...prev, category] : [category]));
  }

  function handleRemoveCategoryFromSelected(id: number) {
    setSelectedCategories((prev) =>
      prev?.filter((category) => category.id !== id)
    );
  }

  return (
    <div className="p-6 flex flex-1 flex-col">
      <header className="flex flex-col gap-1">
        <p className="font-bold text-primaryGreen text-3xl">Novo treino</p>
        <div className="flex flex-row gap-2 text-white-f5 font-semibold text-lg">
          <p onClick={() => titleRef.current?.focus()}>Título: </p>
          <input
            className="bg-transparent outline-none text-white-f5 min-w-10 max-h-full placeholder:text-gray-medium"
            ref={titleRef}
            placeholder="Título do treino"
          />
        </div>
        <div className="flex flex-row gap-2 text-gray-light font-medium text-lg">
          <p onClick={() => descriptionRef.current?.focus()}>Descrição: </p>
          <input
            className="bg-transparent outline-none text-white-f5 min-w-10 max-h-full placeholder:text-gray-medium caret-gray-medium"
            ref={descriptionRef}
            placeholder="Descrição do treino"
          />
        </div>
        <div className="flex flex-row gap-1 text-gray-light font-medium text-lg items-center">
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

          <PlusSignSquareIcon className="cursor-pointer" onClick={toggleMenu} />

          {isCategoriesMenuOpen && (
            <CategoriesMenu
              data={mockedCategories}
              innerRef={menuRef}
              setIsCategoriesMenuOpen={setIsCategoriesMenuOpen}
              onSelectCategory={handleSelectCategory}
            />
          )}
        </div>
      </header>
      <main className="flex-1 gap-2 flex flex-row items-start py-2">
        <div className="bg-white-f5 w-1/2 rounded-lg p-2 gap-2 flex flex-col">
          <div className="bg-primaryDarkBg rounded-lg text-white-f5 flex flex-row px-2 py-1 gap-2">
            <LinkSquare01Icon />
            <p>ease</p>
          </div>
          <div className="bg-primaryDarkBg rounded-lg text-white-f5 flex flex-row px-2 py-1 justify-center">
            <PlusSignIcon />
          </div>
        </div>

        <div className="bg-gray-light w-1/2 rounded-lg p-2 gap-2 flex flex-col">
          <div className="flex flex-row gap-2 text-white-f5 font-semibold text-lg">
            <input
              className="bg-transparent outline-none text-white-f5 min-w-10 max-h-full placeholder:text-gray-medium w-full caret-gray-medium"
              placeholder="Título"
            />
          </div>
          <div className="bg-gray-dark rounded-lg text-white-f5 flex flex-row px-2 py-1 justify-center">
            <PlusSignIcon />
          </div>
        </div>
      </main>
      <footer className="flex flex-row-reverse gap-4">
        <PrimaryButton label="Salvar treino" onClick={() => {}} />
        <PrimaryButton
          label="Vincular a planilha"
          onClick={() => {}}
          variation="white-bg"
        />
      </footer>
    </div>
  );
}
