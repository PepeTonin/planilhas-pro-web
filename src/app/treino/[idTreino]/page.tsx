"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlusSignIcon } from "hugeicons-react";

import {
  TrainCategory,
  TrainingMovement,
  TrainingDescription,
} from "@/utils/sharedTypes";

import ContentHeader from "@/components/ContentHeader";
import CardTraining from "@/components/CardTraining";

import { mockedCategories } from "@/data/mockedData";
import ContentFooter from "@/components/ContentFooter";

export interface ITreinoRouteParams {
  params: {
    idTreino: string;
  };
}

export default function DetalhesTreino({ params }: ITreinoRouteParams) {
  const [selectedCategories, setSelectedCategories] =
    useState<TrainCategory[]>();

  const [trainingMovements, setTrainingMovements] =
    useState<TrainingMovement[]>();

  const [newIdTrainingMovement, setNewIdTrainingMovement] = useState<number>(0);

  const [descriptionSelectedTrainingMov, setDescriptionSelectedTrainingMov] =
    useState<TrainingDescription[]>();

  const [newIdDescription, setNewIdDescription] = useState<number>(0);

  const [idSelectedTrainingMovement, setIdSelectedTrainingMovement] =
    useState(-1);

  const [trainingMovTitle, setTrainingMovTitle] = useState("");

  useEffect(() => {
    if (!trainingMovements || trainingMovements.length === 0) {
      setIdSelectedTrainingMovement(-1);
    }
  }, [trainingMovements]);

  const router = useRouter();

  function handleSelectCategory(category: TrainCategory) {
    if (
      selectedCategories &&
      (selectedCategories.includes(category) || selectedCategories.length === 4)
    )
      return;
    setSelectedCategories((prev) => (prev ? [...prev, category] : [category]));
  }

  function handleRemoveCategoryFromSelected(categoryId: number) {
    setSelectedCategories((prev) =>
      prev?.filter((category) => category.id !== categoryId)
    );
  }

  function handleCreateNewTrainingMovement() {
    if (!trainingMovements) {
      const newTrainingMovement: TrainingMovement = {
        id: newIdTrainingMovement,
        title: "Novo movimento",
        description: [],
      };
      setNewIdTrainingMovement((prev) => prev + 1);
      return setTrainingMovements([newTrainingMovement]);
    }
    const newTrainingMovement: TrainingMovement = {
      id: newIdTrainingMovement,
      title: "Novo movimento",
      description: [],
    };
    setNewIdTrainingMovement((prev) => prev + 1);
    return setTrainingMovements((prev) => [...prev!, newTrainingMovement]);
  }

  function handleSelectTrainingMovement(trainingMovId: number) {
    setIdSelectedTrainingMovement(trainingMovId);
    const selectedMovement = trainingMovements?.find(
      (trainingMovement) => trainingMovement.id === trainingMovId
    );
    const description = selectedMovement?.description;
    if (description) setDescriptionSelectedTrainingMov(description);
    const title = selectedMovement?.title;
    if (title) setTrainingMovTitle(title);
  }

  function handleDeleteItemFromTrainingMovements(trainingMovId: number) {
    if (!trainingMovements) return;
    const filteredTrainingMovements = trainingMovements.filter(
      (trainingMovement) => trainingMovement.id !== trainingMovId
    );
    setTrainingMovements(filteredTrainingMovements);
  }

  function handleAddNewDescriptionToMov(trainingMovId: number) {
    if (!trainingMovements) return;
    const newDescription = {
      id: newIdDescription,
      description: "",
    };
    setNewIdDescription((prev) => prev + 1);
    const updatedTrainingMovements = trainingMovements.map(
      (trainingMovement) => {
        if (trainingMovement.id === trainingMovId) {
          if (
            !trainingMovement.description ||
            trainingMovement.description.length === 0
          ) {
            return {
              ...trainingMovement,
              description: [newDescription],
            };
          }
          return {
            ...trainingMovement,
            description: [...trainingMovement.description, newDescription],
          };
        }
        return trainingMovement;
      }
    );
    setTrainingMovements(updatedTrainingMovements);
    setDescriptionSelectedTrainingMov((prev) =>
      prev ? [...prev, newDescription] : [newDescription]
    );
  }

  function handleDeleteDescriptionItem(
    descriptionId: number,
    trainingMovId: number
  ) {
    if (!trainingMovements) return;
    const updatedTrainingMovements = trainingMovements.map(
      (trainingMovement) => {
        if (trainingMovement.id === trainingMovId) {
          const updatedDescription = trainingMovement.description.filter(
            (description) => description.id !== descriptionId
          );
          return {
            ...trainingMovement,
            description: updatedDescription,
          };
        }
        return trainingMovement;
      }
    );
    setTrainingMovements(updatedTrainingMovements);
    setDescriptionSelectedTrainingMov((prev) =>
      prev?.filter((description) => description.id !== descriptionId)
    );
  }

  function handleSetTrainingMovTitle(id: number, title: string) {
    if (!trainingMovements) return;
    setTrainingMovTitle(title);
    const updatedTrainingMovements = trainingMovements.map(
      (trainingMovement) => {
        if (trainingMovement.id === id) {
          return {
            ...trainingMovement,
            title: title,
          };
        }
        return trainingMovement;
      }
    );
    setTrainingMovements(updatedTrainingMovements);
  }

  function handleSetNewDescriptionToTrainingMov(
    idTrainingMov: number,
    idDescription: number,
    description: string
  ) {
    if (!trainingMovements) return;
    const updatedTrainingMovements = trainingMovements.map(
      (trainingMovement) => {
        if (trainingMovement.id === idTrainingMov) {
          const updatedDescription = trainingMovement.description.map(
            (descriptionItem) => {
              if (descriptionItem.id === idDescription) {
                return {
                  ...descriptionItem,
                  description: description,
                };
              }
              return descriptionItem;
            }
          );
          return {
            ...trainingMovement,
            description: updatedDescription,
          };
        }
        return trainingMovement;
      }
    );
    setTrainingMovements(updatedTrainingMovements);
  }

  function handleSaveTraining() {
    console.log(trainingMovements);
  }

  function handleStudentLink() {
    console.log("student");
  }

  function handleExistingWorkoutPlan() {
    console.log("existing");
  }

  function handleNewWorkoutPlan() {
    // busca as planilhas no bd
    // verifica qual o id que será usado para essa nova planilha
    // navega para a rota /planilha/id
    const newId = Math.floor(Math.random() * 10);

    router.push(`/planilha/${newId}`);
  }

  return (
    <div className="p-6 flex flex-1 flex-col overflow-y-auto h-[calc(100vh-5rem)] scrollbar-custom">
      <ContentHeader
        categories={mockedCategories}
        variation="treino"
        handleRemoveCategoryFromSelected={handleRemoveCategoryFromSelected}
        handleSelectCategory={handleSelectCategory}
        selectedCategories={selectedCategories || []}
      />

      <main className="flex-1 gap-2 flex flex-row items-start py-2">
        <div className="bg-white-f5 w-1/2 rounded-lg p-2 gap-2 flex flex-col">
          {trainingMovements &&
            trainingMovements.length > 0 &&
            trainingMovements.map((movement) => (
              <CardTraining
                key={movement.id}
                idTrainingMov={movement.id}
                variation="training-movement"
                innerText={movement.title}
                selectedItem={idSelectedTrainingMovement}
                handleSelect={handleSelectTrainingMovement}
                handleDeleteTrainingMov={handleDeleteItemFromTrainingMovements}
              />
            ))}

          <div
            onClick={handleCreateNewTrainingMovement}
            className="bg-primaryDarkBg rounded-md text-white-f5 flex flex-row px-2 py-1 justify-center cursor-pointer gap-2"
          >
            <PlusSignIcon />
            <p>Novo movimento</p>
          </div>
        </div>

        {idSelectedTrainingMovement !== -1 && (
          <div className="bg-gray-light w-1/2 rounded-lg p-2 gap-2 flex flex-col">
            <div className="flex flex-row gap-2 text-white-f5 font-semibold text-lg">
              <input
                className="bg-transparent outline-none text-white-f5 min-w-10 max-h-full placeholder:text-gray-medium w-full caret-gray-medium"
                placeholder="Título"
                value={trainingMovTitle}
                onChange={(e) =>
                  handleSetTrainingMovTitle(
                    idSelectedTrainingMovement,
                    e.target.value
                  )
                }
              />
            </div>

            {descriptionSelectedTrainingMov &&
              descriptionSelectedTrainingMov.length > 0 &&
              descriptionSelectedTrainingMov.map((description) => (
                <CardTraining
                  key={description.id}
                  idTrainingMov={idSelectedTrainingMovement}
                  idDescriptionItem={description.id}
                  variation="training-description"
                  innerText={description.description}
                  selectedItem={0}
                  handleSelect={() => {}}
                  handleDeleteDescriptionItem={handleDeleteDescriptionItem}
                  handleUpdateDescriptionItem={
                    handleSetNewDescriptionToTrainingMov
                  }
                />
              ))}

            <div
              onClick={() =>
                handleAddNewDescriptionToMov(idSelectedTrainingMovement)
              }
              className="bg-gray-dark rounded-md text-white-f5 flex flex-row px-2 py-1 justify-center cursor-pointer gap-2"
            >
              <PlusSignIcon />
              <p>Nova descrição</p>
            </div>
          </div>
        )}
      </main>

      <ContentFooter
        variation="treino"
        handleExistingWorkoutPlan={handleExistingWorkoutPlan}
        handleNewWorkoutPlan={handleNewWorkoutPlan}
        handleStudentLink={handleStudentLink}
        handleSave={handleSaveTraining}
      />
    </div>
  );
}
