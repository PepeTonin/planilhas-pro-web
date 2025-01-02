"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlusSignIcon } from "hugeicons-react";
import toast, { Toaster } from "react-hot-toast";

import {
  createNewWorkoutPlan,
  getWorkoutPlanById,
  getWorkoutPlanModels,
} from "@/api/workoutPlan";
import { useAppSelector } from "@/store/store";

import ContentHeader from "@/components/ContentHeader";
import CardTraining from "@/components/CardTraining";
import ContentFooter from "@/components/ContentFooter";
import LoadingFeedback from "@/components/LoadingFeedback";

import { TrainCategory } from "@/types/treino";
import {
  TrainingBlock,
  WorkoutPlan,
  WorkoutPlanSession,
  WorkoutPlanModel,
} from "@/types/workoutPlan";

// mocked apagar
import { mockedCategories } from "@/data/mockedData";
// mocked apagar

export default function NovaPlanilha() {
  const [workoutPlanTitle, setWorkoutPlanTitle] = useState("");
  const [workoutPlanDescription, setWorkoutPlanDescription] = useState("");

  const [selectedCategories, setSelectedCategories] =
    useState<TrainCategory[]>();

  const [selectedModel, setSelectedModel] = useState<WorkoutPlanModel>();
  const [allModels, setAllModels] = useState<WorkoutPlanModel[]>();
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingWorkoutPlan, setLoadingWorkoutPlan] = useState(false);

  const [workoutPlanSessions, setWorkoutPlanSessions] =
    useState<WorkoutPlanSession[]>();
  const [newIdWorkoutPlanSession, setNewIdWorkoutPlanSession] =
    useState<number>(0);
  const [workoutPlanSessionTitle, setWorkoutPlanSessionTitle] = useState("");

  const [selectedTrainingBlocks, setSelectedTrainingBlocks] =
    useState<TrainingBlock[]>();
  const [newTrainingBlockId, setNewTrainingBlockId] = useState<number>(0);
  const [idSelectedWorkoutPlanBlock, setIdSelectedWorkoutPlanBlock] =
    useState(-1);

  const [isSavingWorkoutPlan, setIsSavingWorkoutPlan] = useState(false);

  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  async function getAllModels() {
    setLoadingModels(true);
    const models = await getWorkoutPlanModels(user.id);
    setLoadingModels(false);
    if (!models) return;
    setAllModels(models);
  }

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

  async function handleSelectModel(model: WorkoutPlanModel) {
    setSelectedModel(model);
    setLoadingWorkoutPlan(true);
    const workoutPlan = await getWorkoutPlanById(model.workoutPlanId);
    if (!workoutPlan) {
      setLoadingWorkoutPlan(false);
      return;
    }
    setWorkoutPlanTitle(workoutPlan.title);
    setWorkoutPlanDescription(workoutPlan.description);
    setWorkoutPlanSessions(workoutPlan.sessions);
    setLoadingWorkoutPlan(false);
  }

  function handleCreateNewWorkoutPlanBlock() {
    const newWorkoutPlanBlock: WorkoutPlanSession = {
      id: newIdWorkoutPlanSession,
      title: "Novo sessão",
      trainingBlocks: [],
    };
    setNewIdWorkoutPlanSession((prev) => prev + 1);
    return setWorkoutPlanSessions((prev) =>
      prev ? [...prev!, newWorkoutPlanBlock] : [newWorkoutPlanBlock]
    );
  }

  function handleSelectWorkoutPlanBlock(workoutPlanBlockId: number) {
    setIdSelectedWorkoutPlanBlock(workoutPlanBlockId);
    const selectedBlock = workoutPlanSessions?.find(
      (trainingMovement) => trainingMovement.id === workoutPlanBlockId
    );
    const trainingBlocks = selectedBlock?.trainingBlocks;
    if (trainingBlocks) setSelectedTrainingBlocks(trainingBlocks);
    const title = selectedBlock?.title;
    if (title) setWorkoutPlanSessionTitle(title);
  }

  function handleDeleteItemFromWorkoutPlan(workoutPlanBlockId: number) {
    if (!workoutPlanSessions) return;
    const filteredWorkoutPlanBlocks = workoutPlanSessions.filter(
      (workoutPlanBlock) => workoutPlanBlock.id !== workoutPlanBlockId
    );
    setWorkoutPlanSessions(filteredWorkoutPlanBlocks);
  }

  function handleCreateNewTrainingBlock(workoutPlanBlockId: number) {
    if (!workoutPlanSessions) return;
    const newTrainingBlock = {
      id: newTrainingBlockId,
      title: "",
      linkedTraining: {},
    } as TrainingBlock;
    setNewTrainingBlockId((prev) => prev + 1);
    const updatedWorkoutPlanBlocks = workoutPlanSessions.map(
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
    setWorkoutPlanSessions(updatedWorkoutPlanBlocks);
    setSelectedTrainingBlocks((prev) =>
      prev ? [...prev, newTrainingBlock] : [newTrainingBlock]
    );
  }

  function handleDeleteTrainingBlockItem(
    trainingBlockId: number,
    workoutPlanBlockId: number
  ) {
    if (!workoutPlanSessions) return;
    const updatedWorkoutPlanBlocks = workoutPlanSessions.map(
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
    setWorkoutPlanSessions(updatedWorkoutPlanBlocks);
    setSelectedTrainingBlocks((prev) =>
      prev?.filter((trainingBlock) => trainingBlock.id !== trainingBlockId)
    );
  }

  function handleSetWorkoutPlanBlockTitle(id: number, title: string) {
    if (!workoutPlanSessions) return;
    setWorkoutPlanSessionTitle(title);
    const updatedWorkoutPlanBlocks = workoutPlanSessions.map(
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
    setWorkoutPlanSessions(updatedWorkoutPlanBlocks);
  }

  function handleSetNewTitleToTrainingBlock(
    idWorkoutPlanBlock: number,
    idTrainingBlock: number,
    newTitle: string
  ) {
    if (!workoutPlanSessions) return;
    const updatedWorkouPlanBlocks = workoutPlanSessions.map(
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
    setWorkoutPlanSessions(updatedWorkouPlanBlocks);
  }

  function handleSelectTrainingInModal(
    idTrainingBlock: number,
    idSelectedTraining: number,
    titleSelectedTraining: string
  ) {
    if (!workoutPlanSessions) return;
    const updatedWorkoutPlanBlocks = workoutPlanSessions.map(
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
    setWorkoutPlanSessions(updatedWorkoutPlanBlocks);
  }

  async function handleSaveWorkoutPlan() {
    if (!workoutPlanSessions || workoutPlanSessions.length === 0) {
      toast.error("Erro ao salvar planilha");
      return;
    }
    setIsSavingWorkoutPlan(true);
    const workoutPlan: WorkoutPlan = {
      title: workoutPlanTitle,
      description: workoutPlanDescription,
      sessions: workoutPlanSessions,
    };
    const response = await createNewWorkoutPlan(user.id, workoutPlan);
    setIsSavingWorkoutPlan(false);
    if (!response) {
      toast.error("Erro ao salvar planilha");
      return undefined;
    }
    toast.success("Planilha salva com sucesso");
    setWorkoutPlanTitle("");
    setWorkoutPlanDescription("");
    setWorkoutPlanSessions([]);
    setNewIdWorkoutPlanSession(0);
    setWorkoutPlanSessionTitle("");
    setNewTrainingBlockId(0);
    setSelectedTrainingBlocks([]);
    setIdSelectedWorkoutPlanBlock(-1);
    setSelectedModel(undefined);
    return response;
  }

  async function handleLinkToStudent() {
    const response = await handleSaveWorkoutPlan();
    if (!response) return;
    router.push(`/planilha/${response.id}/vincular`);
  }

  useEffect(() => {
    if (!workoutPlanSessions || workoutPlanSessions.length === 0) {
      setIdSelectedWorkoutPlanBlock(-1);
    }
  }, [workoutPlanSessions]);

  useEffect(() => {
    getAllModels();
  }, []);

  if (loadingWorkoutPlan) {
    return <LoadingFeedback size="lg" label="Carregando..." />;
  }

  return (
    <div className="p-6 flex flex-1 flex-col justify-between h-[calc(100vh-5rem)]">
      <Toaster position="top-right" />

      <ContentHeader
        categories={mockedCategories}
        variation="planilha"
        handleRemoveCategoryFromSelected={handleRemoveCategoryFromSelected}
        handleSelectCategory={handleSelectCategory}
        selectedCategories={selectedCategories || []}
        models={allModels}
        isLoadingModels={loadingModels}
        selectedModel={selectedModel}
        handleSelectModel={handleSelectModel}
        title={workoutPlanTitle}
        setTitle={setWorkoutPlanTitle}
        description={workoutPlanDescription}
        setDescription={setWorkoutPlanDescription}
      />

      <main className="flex-1 gap-2 flex flex-row items-start pt-4 pb-2 overflow-y-auto scrollbar-custom my-2">
        <div className="bg-white-f5 w-1/2 rounded-lg p-2 gap-2 flex flex-col">
          {workoutPlanSessions &&
            workoutPlanSessions.length > 0 &&
            workoutPlanSessions.map((workoutPlanBlock) => (
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
            <p>Nova sessão</p>
          </div>
        </div>

        {idSelectedWorkoutPlanBlock !== -1 && (
          <div className="bg-gray-light w-1/2 rounded-lg p-2 gap-2 flex flex-col">
            <div className="flex flex-row gap-2 text-white-f5 font-semibold text-lg">
              <input
                className="bg-transparent outline-none text-white-f5 min-w-10 max-h-full placeholder:text-gray-medium w-full caret-gray-medium"
                placeholder="Título"
                value={workoutPlanSessionTitle}
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
                  handleSelectTraining={handleSelectTrainingInModal}
                  fetchedTrainingTitle={trainingBlock.linkedTraining.title}
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
        isBtnLoading={isSavingWorkoutPlan}
      />
    </div>
  );
}
