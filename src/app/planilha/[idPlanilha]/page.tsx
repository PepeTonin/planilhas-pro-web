"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlusSignIcon } from "hugeicons-react";

import {
  TrainCategory,
  TrainingBlock,
  WorkoutPlanBlock,
  WorkoutPlanModel,
} from "@/utils/tempTypes";

import ContentHeader from "@/components/ContentHeader";
import CardTraining from "@/components/CardTraining";
import ContentFooter from "@/components/ContentFooter";

import {
  mockedCategories,
  mockedModels,
  mockedTrainings,
} from "@/data/mockedData";

export interface IPlanilhaRouteParams {
  params: {
    idPlanilha: string;
  };
}

export default function DetalhesPlanilha({ params }: IPlanilhaRouteParams) {
  const [selectedCategories, setSelectedCategories] =
    useState<TrainCategory[]>();

  const [selectedModel, setSelectedModel] = useState<WorkoutPlanModel>();

  const [workoutPlanBlocks, setWorkoutPlanBlocks] =
    useState<WorkoutPlanBlock[]>();

  const [newIdWorkoutPlanBlock, setNewIdWorkoutPlanBlock] = useState<number>(0);

  const [selectedTrainingBlocks, setSelectedTrainingBlocks] =
    useState<TrainingBlock[]>();

  const [newTrainingBlockId, setNewTrainingBlockId] = useState<number>(0);

  const [idSelectedWorkoutPlanBlock, setIdSelectedWorkoutPlanBlock] =
    useState(-1);

  const [workoutPlanBlockTitle, setWorkoutPlanBlockTitle] = useState("");

  useEffect(() => {
    if (!workoutPlanBlocks || workoutPlanBlocks.length === 0) {
      setIdSelectedWorkoutPlanBlock(-1);
    }
  }, [workoutPlanBlocks]);

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

  function handleSelectModel(model: WorkoutPlanModel) {
    setSelectedModel(model);
  }

  function handleCreateNewWorkoutPlanBlock() {
    if (!workoutPlanBlocks) {
      const newWorkoutPlanBlock: WorkoutPlanBlock = {
        id: newIdWorkoutPlanBlock,
        title: "Novo bloco",
        trainingBlocks: [],
      };
      setNewIdWorkoutPlanBlock((prev) => prev + 1);
      return setWorkoutPlanBlocks([newWorkoutPlanBlock]);
    }
    const newWorkoutPlanBlock: WorkoutPlanBlock = {
      id: newIdWorkoutPlanBlock,
      title: "Novo bloco",
      trainingBlocks: [],
    };
    setNewIdWorkoutPlanBlock((prev) => prev + 1);
    return setWorkoutPlanBlocks((prev) => [...prev!, newWorkoutPlanBlock]);
  }

  function handleSelectWorkoutPlanBlock(workoutPlanBlockId: number) {
    setIdSelectedWorkoutPlanBlock(workoutPlanBlockId);
    const selectedBlock = workoutPlanBlocks?.find(
      (trainingMovement) => trainingMovement.id === workoutPlanBlockId
    );
    const trainingBlocks = selectedBlock?.trainingBlocks;
    if (trainingBlocks) setSelectedTrainingBlocks(trainingBlocks);
    const title = selectedBlock?.title;
    if (title) setWorkoutPlanBlockTitle(title);
  }

  function handleDeleteItemFromWorkoutPlan(workoutPlanBlockId: number) {
    if (!workoutPlanBlocks) return;
    const filteredWorkoutPlanBlocks = workoutPlanBlocks.filter(
      (workoutPlanBlock) => workoutPlanBlock.id !== workoutPlanBlockId
    );
    setWorkoutPlanBlocks(filteredWorkoutPlanBlocks);
  }

  function handleCreateNewTrainingBlock(workoutPlanBlockId: number) {
    if (!workoutPlanBlocks) return;
    const newTrainingBlock = {
      id: newTrainingBlockId,
      title: "",
      linkedTraining: {},
    } as TrainingBlock;
    setNewTrainingBlockId((prev) => prev + 1);
    const updatedWorkoutPlanBlocks = workoutPlanBlocks.map(
      (workoutPlanBlock) => {
        if (workoutPlanBlock.id === workoutPlanBlockId) {
          if (
            !workoutPlanBlock.trainingBlocks ||
            workoutPlanBlock.trainingBlocks.length === 0
          ) {
            return {
              ...workoutPlanBlock,
              trainingBlocks: [newTrainingBlock],
            };
          }
          return {
            ...workoutPlanBlock,
            trainingBlocks: [
              ...workoutPlanBlock.trainingBlocks,
              newTrainingBlock,
            ],
          };
        }
        return workoutPlanBlock;
      }
    );
    setWorkoutPlanBlocks(updatedWorkoutPlanBlocks);
    setSelectedTrainingBlocks((prev) =>
      prev ? [...prev, newTrainingBlock] : [newTrainingBlock]
    );
  }

  function handleDeleteTrainingBlockItem(
    trainingBlockId: number,
    workoutPlanBlockId: number
  ) {
    if (!workoutPlanBlocks) return;
    const updatedWorkoutPlanBlocks = workoutPlanBlocks.map(
      (workoutPlanBlock) => {
        if (workoutPlanBlock.id === workoutPlanBlockId) {
          const updatedTrainingBlocks = workoutPlanBlock.trainingBlocks.filter(
            (trainingBlock) => trainingBlock.id !== trainingBlockId
          );
          return {
            ...workoutPlanBlock,
            trainingBlocks: updatedTrainingBlocks,
          };
        }
        return workoutPlanBlock;
      }
    );
    setWorkoutPlanBlocks(updatedWorkoutPlanBlocks);
    setSelectedTrainingBlocks((prev) =>
      prev?.filter((trainingBlock) => trainingBlock.id !== trainingBlockId)
    );
  }

  function handleSetWorkoutPlanBlockTitle(id: number, title: string) {
    if (!workoutPlanBlocks) return;
    setWorkoutPlanBlockTitle(title);
    const updatedWorkoutPlanBlocks = workoutPlanBlocks.map(
      (workoutPlanBlock) => {
        if (workoutPlanBlock.id === id) {
          return {
            ...workoutPlanBlock,
            title: title,
          };
        }
        return workoutPlanBlock;
      }
    );
    setWorkoutPlanBlocks(updatedWorkoutPlanBlocks);
  }

  function handleSetNewTitleToTrainingBlock(
    idWorkoutPlanBlock: number,
    idTrainingBlock: number,
    newTitle: string
  ) {
    if (!workoutPlanBlocks) return;
    const updatedWorkouPlanBlocks = workoutPlanBlocks.map(
      (workoutPlanBlock) => {
        if (workoutPlanBlock.id === idWorkoutPlanBlock) {
          const updatedTrainingBlocks = workoutPlanBlock.trainingBlocks.map(
            (trainingBlock) => {
              if (trainingBlock.id === idTrainingBlock) {
                return {
                  ...trainingBlock,
                  title: newTitle,
                };
              }
              return trainingBlock;
            }
          );
          return {
            ...workoutPlanBlock,
            trainingBlocks: updatedTrainingBlocks,
          };
        }
        return workoutPlanBlock;
      }
    );
    setWorkoutPlanBlocks(updatedWorkouPlanBlocks);
  }

  function handleSelectTrainingInModal(
    idTrainingBlock: number,
    idSelectedTraining: number,
    titleSelectedTraining: string
  ) {
    if (!workoutPlanBlocks) return;
    const updatedWorkoutPlanBlocks = workoutPlanBlocks.map(
      (workoutPlanBlock) => {
        if (workoutPlanBlock.id === idSelectedWorkoutPlanBlock) {
          const updatedTrainingBlocks = workoutPlanBlock.trainingBlocks.map(
            (trainingBlock) => {
              if (trainingBlock.id === idTrainingBlock) {
                return {
                  ...trainingBlock,
                  linkedTraining: {
                    id: idSelectedTraining,
                    title: titleSelectedTraining,
                    movements: [],
                  },
                };
              }
              return trainingBlock;
            }
          );
          return {
            ...workoutPlanBlock,
            trainingBlocks: updatedTrainingBlocks,
          };
        }
        return workoutPlanBlock;
      }
    );
    setWorkoutPlanBlocks(updatedWorkoutPlanBlocks);
  }

  function handleSaveWorkoutPlan() {
    console.log(workoutPlanBlocks);
  }

  function handleLinkToStudent() {
    router.push(`/planilha/${params.idPlanilha}/vincular`);
  }

  return (
    <div className="p-6 flex flex-1 flex-col overflow-y-auto h-[calc(100vh-5rem)] scrollbar-custom">
      <ContentHeader
        categories={mockedCategories}
        variation="planilha"
        handleRemoveCategoryFromSelected={handleRemoveCategoryFromSelected}
        handleSelectCategory={handleSelectCategory}
        selectedCategories={selectedCategories || []}
        models={mockedModels}
        selectedModel={selectedModel}
        handleSelectModel={handleSelectModel}
      />

      <main className="flex-1 gap-2 flex flex-row items-start py-2">
        <div className="bg-white-f5 w-1/2 rounded-lg p-2 gap-2 flex flex-col">
          {workoutPlanBlocks &&
            workoutPlanBlocks.length > 0 &&
            workoutPlanBlocks.map((workoutPlanBlock) => (
              <CardTraining
                key={workoutPlanBlock.id}
                variation="workout-plan-block"
                idPrimaryItem={workoutPlanBlock.id}
                innerText={workoutPlanBlock.title}
                selectedItem={idSelectedWorkoutPlanBlock}
                handleSelect={handleSelectWorkoutPlanBlock}
                handleDeletePrimaryItem={handleDeleteItemFromWorkoutPlan}
              />
            ))}

          <div
            onClick={handleCreateNewWorkoutPlanBlock}
            className="bg-primaryDarkBg rounded-md text-white-f5 flex flex-row px-2 py-1 justify-center cursor-pointer gap-2"
          >
            <PlusSignIcon />
            <p>Novo bloco</p>
          </div>
        </div>

        {idSelectedWorkoutPlanBlock !== -1 && (
          <div className="bg-gray-light w-1/2 rounded-lg p-2 gap-2 flex flex-col">
            <div className="flex flex-row gap-2 text-white-f5 font-semibold text-lg">
              <input
                className="bg-transparent outline-none text-white-f5 min-w-10 max-h-full placeholder:text-gray-medium w-full caret-gray-medium"
                placeholder="Título"
                value={workoutPlanBlockTitle}
                onChange={(e) =>
                  handleSetWorkoutPlanBlockTitle(
                    idSelectedWorkoutPlanBlock,
                    e.target.value
                  )
                }
              />
            </div>

            {selectedTrainingBlocks &&
              selectedTrainingBlocks.length > 0 &&
              selectedTrainingBlocks.map((trainingBlock) => (
                <CardTraining
                  key={trainingBlock.id}
                  variation="workout-plan-training-block"
                  idPrimaryItem={idSelectedWorkoutPlanBlock}
                  idSecondaryItem={trainingBlock.id}
                  innerText={trainingBlock.title}
                  handleDeleteSecondaryItem={handleDeleteTrainingBlockItem}
                  handleUpdateTextSecondaryItem={
                    handleSetNewTitleToTrainingBlock
                  }
                  trainingData={mockedTrainings}
                  handleSelectTraining={handleSelectTrainingInModal}
                />
              ))}

            <div
              onClick={() =>
                handleCreateNewTrainingBlock(idSelectedWorkoutPlanBlock)
              }
              className="bg-gray-dark rounded-md text-white-f5 flex flex-row px-2 py-1 justify-center cursor-pointer gap-2"
            >
              <PlusSignIcon />
              <p>Novo bloco de treino</p>
            </div>
          </div>
        )}
      </main>

      <ContentFooter
        variation="planilha"
        handleLink={handleLinkToStudent}
        handleSave={handleSaveWorkoutPlan}
      />
    </div>
  );
}
