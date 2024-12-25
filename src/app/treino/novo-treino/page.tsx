"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PlusSignIcon, SearchList02Icon } from "hugeicons-react";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "@nextui-org/spinner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";

import ContentHeader from "@/components/ContentHeader";
import CardTraining from "@/components/CardTraining";
import ContentFooter from "@/components/ContentFooter";

import { useAppSelector } from "@/store/store";
import {
  createNewTreino,
  getMovementDetails,
  getTrainingMovements,
} from "@/api/treino";

import {
  MovementDescription,
  TrainCategory,
  Training,
  TrainingMovement,
  TrainingMovementResponse,
} from "@/types/treino";

import { mockedCategories } from "@/data/mockedData";

export default function NovoTreino() {
  const [trainingTitle, setTrainingTitle] = useState("");
  const [trainingDescription, setTrainingDescription] = useState("");

  const [isSavingTraining, setIsSavingTraining] = useState(false);

  const [selectedCategories, setSelectedCategories] =
    useState<TrainCategory[]>();

  const [trainingMovements, setTrainingMovements] =
    useState<TrainingMovement[]>();

  const [newIdTrainingMovement, setNewIdTrainingMovement] = useState<number>(0);

  const [descriptionSelectedTrainingMov, setDescriptionSelectedTrainingMov] =
    useState<MovementDescription[]>();

  const [newIdDescription, setNewIdDescription] = useState<number>(0);

  const [idSelectedTrainingMovement, setIdSelectedTrainingMovement] =
    useState(-1);

  const [trainingMovTitle, setTrainingMovTitle] = useState("");

  const [movementsAvailable, setMovementsAvailable] =
    useState<TrainingMovementResponse[]>();

  const [loadingMovements, setLoadingMovements] = useState(false);

  useEffect(() => {
    if (!trainingMovements || trainingMovements.length === 0) {
      setIdSelectedTrainingMovement(-1);
    }
  }, [trainingMovements]);

  const router = useRouter();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { user } = useAppSelector((state) => state.auth);

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

  async function getAllMovements() {
    setLoadingMovements(true);
    const trainingMovements = await getTrainingMovements(user.id);
    setLoadingMovements(false);
    if (!trainingMovements) return;
    setMovementsAvailable(trainingMovements);
  }

  async function handleSearchTrainingMovements() {
    onOpen();
    await getAllMovements();
  }

  async function handleSelectMovementItem(id: number) {
    setLoadingMovements(true);
    const movementDetails = await getMovementDetails(user.id, id);
    setLoadingMovements(false);
    if (!movementDetails) return;

    const newTrainingMovement: TrainingMovement = {
      id: newIdTrainingMovement,
      title: movementDetails.titulo,
      description: movementDetails.descricoes.map((description) => ({
        id: description.descricaoMovimentoId,
        description: description.descricao,
      })),
    };
    setNewIdTrainingMovement((prev) => prev + 1);
    setTrainingMovements((prev) =>
      prev ? [...prev, newTrainingMovement] : [newTrainingMovement]
    );
    onClose();
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

  async function handleSaveTraining() {
    if (!trainingMovements || trainingMovements.length === 0) {
      toast.error("Erro ao salvar treino");
      return;
    }
    setIsSavingTraining(true);
    const training: Training = {
      title: trainingTitle,
      description: trainingDescription,
      movements: trainingMovements,
    };
    const response = await createNewTreino(user.id, training);
    setIsSavingTraining(false);
    if (!response) {
      toast.error("Erro ao salvar treino");
      return undefined;
    }
    toast.success("Treino salvo com sucesso");
    setTrainingTitle("");
    setTrainingDescription("");
    setTrainingMovements([]);
    setIdSelectedTrainingMovement(-1);
    setNewIdTrainingMovement(0);
    setNewIdDescription(0);
    return response;
  }

  function handleStudentLink() {
    console.log("student");
  }

  function handleExistingWorkoutPlan() {
    console.log("existing");
  }

  async function handleNewWorkoutPlan() {
    const result = await handleSaveTraining();
    if (!result) return;
    router.push(`/planilha/nova-planilha`);
  }

  return (
    <div className="p-6 flex flex-1 flex-col overflow-y-auto h-[calc(100vh-5rem)] scrollbar-custom">
      <Toaster position="top-right" />
      <ContentHeader
        categories={mockedCategories}
        variation="treino"
        handleRemoveCategoryFromSelected={handleRemoveCategoryFromSelected}
        handleSelectCategory={handleSelectCategory}
        selectedCategories={selectedCategories || []}
        title={trainingTitle}
        setTitle={setTrainingTitle}
        description={trainingDescription}
        setDescription={setTrainingDescription}
      />

      <main className="flex-1 gap-2 flex flex-row items-start py-2">
        <div className="bg-white-f5 w-1/2 rounded-lg p-2 gap-2 flex flex-col">
          <p className="font-bold">Movimentos do treino</p>
          {trainingMovements &&
            trainingMovements.length > 0 &&
            trainingMovements.map((movement) => (
              <CardTraining
                key={movement.id}
                variation="training-movement"
                idPrimaryItem={movement.id}
                innerText={movement.title}
                selectedItem={idSelectedTrainingMovement}
                handleSelect={handleSelectTrainingMovement}
                handleDeletePrimaryItem={handleDeleteItemFromTrainingMovements}
              />
            ))}
          <div className="flex flex-row gap-2">
            <button
              onClick={handleSearchTrainingMovements}
              className="flex-1 bg-gray-dark rounded-md text-white-f5 flex flex-row px-2 py-1 justify-center cursor-pointer gap-2"
            >
              <SearchList02Icon />
              <p>Buscar</p>
            </button>
            <button
              onClick={handleCreateNewTrainingMovement}
              className="flex-1 bg-primaryDarkBg rounded-md text-white-f5 flex flex-row px-2 py-1 justify-center cursor-pointer gap-2"
            >
              <PlusSignIcon />
              <p>Novo</p>
            </button>
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
                  variation="training-description"
                  idPrimaryItem={idSelectedTrainingMovement}
                  idSecondaryItem={description.id}
                  innerText={description.description}
                  handleDeleteSecondaryItem={handleDeleteDescriptionItem}
                  handleUpdateTextSecondaryItem={
                    handleSetNewDescriptionToTrainingMov
                  }
                />
              ))}

            <button
              onClick={() =>
                handleAddNewDescriptionToMov(idSelectedTrainingMovement)
              }
              className="bg-gray-dark rounded-md text-white-f5 flex flex-row px-2 py-1 justify-center cursor-pointer gap-2"
            >
              <PlusSignIcon />
              <p>Nova descrição</p>
            </button>
          </div>
        )}
      </main>

      <ContentFooter
        variation="treino"
        handleExistingWorkoutPlan={handleExistingWorkoutPlan}
        handleNewWorkoutPlan={handleNewWorkoutPlan}
        handleStudentLink={handleStudentLink}
        handleSave={handleSaveTraining}
        isBtnLoading={isSavingTraining}
      />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Movimentos de treino disponíveis
              </ModalHeader>
              <ModalBody className="pb-6">
                {loadingMovements ? (
                  <Spinner color="secondary" />
                ) : (
                  <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                    {movementsAvailable?.map((movement) => (
                      <a
                        key={movement.movimentoId}
                        onClick={() =>
                          handleSelectMovementItem(movement.movimentoId)
                        }
                        className="hover:opacity-80 transition-transform-opacity cursor-pointer"
                      >
                        {movement.titulo}
                      </a>
                    ))}
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
