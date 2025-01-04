import { useEffect, useRef, useState } from "react";
import { Delete04Icon, PencilEdit02Icon } from "hugeicons-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import { TrainingResponse } from "@/types/treino";

import LoadingFeedback from "../LoadingFeedback";
import { Tooltip } from "@nextui-org/tooltip";

type CardTrainingVariationType =
  | "training-movement"
  | "training-description"
  | "workout-plan-block"
  | "workout-plan-training-block";

interface CardTrainingProps {
  variation: CardTrainingVariationType;
  innerText: string;
  idPrimaryItem?: number;
  idSecondaryItem?: number;
  selectedItem?: number;
  handleSelect?: (id: number) => void;
  handleDeletePrimaryItem?: (id: number) => void;
  handleDeleteSecondaryItem?: (
    idSecondaryItem: number,
    idPrimaryItem: number
  ) => void;
  handleUpdateTextSecondaryItem?: (
    idPrimaryItem: number,
    idSecondaryItem: number,
    newText: string
  ) => void;
  handleSelectTraining?: (
    idTrainingBlock: number,
    idSelectedTraining: number,
    titleSelectedTraining: string
  ) => void;
  fetchedTrainingTitle?: string;
  allTrainings?: TrainingResponse[];
  loadingAllTrainings?: boolean;
}

export default function CardTraining({
  variation,
  innerText,
  idPrimaryItem,
  idSecondaryItem,
  selectedItem,
  handleSelect,
  handleDeletePrimaryItem,
  handleDeleteSecondaryItem,
  handleUpdateTextSecondaryItem,
  handleSelectTraining,
  fetchedTrainingTitle,
  allTrainings,
  loadingAllTrainings,
}: CardTrainingProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedTrainingTitle, setSelectedTrainingTitle] =
    useState(fetchedTrainingTitle);

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onOpenChange,
  } = useDisclosure();

  const containerBgColorObject = {
    "training-movement": "bg-primaryDarkBg ",
    "training-description": "bg-gray-dark ",
    "workout-plan-block": "bg-primaryDarkBg ",
    "workout-plan-training-block": "bg-gray-dark ",
  };

  function handleDelete() {
    if (handleDeletePrimaryItem && idPrimaryItem != null)
      handleDeletePrimaryItem(idPrimaryItem);
    if (
      handleDeleteSecondaryItem &&
      idSecondaryItem != null &&
      idPrimaryItem != null
    )
      handleDeleteSecondaryItem(idSecondaryItem, idPrimaryItem);
  }

  function handleSelectItemFromModal(
    idSelectedItem: number,
    titleSelectedItem: string,
    onClose: () => void
  ) {
    onClose();
    setSelectedTrainingTitle(titleSelectedItem);
    if (handleSelectTraining && idSecondaryItem != null)
      handleSelectTraining(idSecondaryItem, idSelectedItem, titleSelectedItem);
  }

  const isSelectable =
    (variation === "training-movement" || variation === "workout-plan-block") &&
    idPrimaryItem != null &&
    handleSelect;

  useEffect(() => {
    setInputValue(innerText);
  }, []);

  useEffect(() => {
    if (
      !handleUpdateTextSecondaryItem ||
      idSecondaryItem == null ||
      idPrimaryItem == null
    )
      return;
    handleUpdateTextSecondaryItem(idPrimaryItem, idSecondaryItem, inputValue);
  }, [inputValue]);

  return (
    <div
      className={`${containerBgColorObject[variation]} rounded-md flex flex-row px-2 py-1 gap-2`}
    >
      {isSelectable && (
        <p
          className={`flex-1 cursor-pointer ${
            selectedItem === idPrimaryItem
              ? "text-primaryGreen"
              : "text-white-f5"
          }`}
          onClick={() => handleSelect(idPrimaryItem)}
        >
          {innerText}
        </p>
      )}
      {variation === "training-description" && (
        <div className="flex flex-row gap-2 flex-1 items-center">
          <PencilEdit02Icon
            width={18}
            className="text-gray-light cursor-pointer hover:opacity-60 transition-opacity"
            onClick={() => inputRef.current?.select()}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Descrição do exercício"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`flex-1 text-white-f5 outline-none ${containerBgColorObject[variation]}`}
          />
        </div>
      )}
      {variation === "workout-plan-training-block" && (
        <div className="flex-1 flex flex-col">
          <div className="flex flex-row gap-2">
            <PencilEdit02Icon
              width={18}
              className="text-gray-light cursor-pointer hover:opacity-60 transition-opacity"
              onClick={() => inputRef.current?.select()}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Título do bloco (como aparece para o aluno)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={`w-full text-white-f5 outline-none ${containerBgColorObject[variation]}`}
            />
          </div>
          <div>
            <p
              className="text-primaryGreen font-semibold text-xs cursor-pointer line-clamp-1"
              onClick={openModal}
            >
              {selectedTrainingTitle || "Adicionar treino"}
            </p>

            <Modal
              isOpen={isModalOpen}
              onOpenChange={onOpenChange}
              scrollBehavior="inside"
            >
              <ModalContent className="bg-white-f5 text-primaryDarkBg">
                {(onClose) => (
                  <>
                    <ModalHeader className="font-bold">
                      Adicionar treino ao bloco
                    </ModalHeader>
                    <ModalBody className="font-semibold ">
                      {loadingAllTrainings && (
                        <LoadingFeedback
                          color="secondary"
                          label="Carregando treinos..."
                          labelColor="secondary"
                        />
                      )}
                      {allTrainings && !loadingAllTrainings && (
                        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
                          {allTrainings.map((training) => (
                            <Tooltip
                              key={training.treinoId}
                              content={
                                <div className="flex flex-col text-sm">
                                  <p className="font-bold">Descrição:</p>
                                  <p>{training.descricao}</p>
                                </div>
                              }
                            >
                              <a className="flex flex-row gap-2 flex-1 cursor-pointer hover:opacity-60">
                                <p
                                  className=" line-clamp-1 flex-1"
                                  onClick={() =>
                                    handleSelectItemFromModal(
                                      training.treinoId,
                                      training.titulo,
                                      onClose
                                    )
                                  }
                                >
                                  {training.titulo}
                                </p>
                              </a>
                            </Tooltip>
                          ))}
                        </div>
                      )}
                    </ModalBody>
                    <ModalFooter />
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      )}

      <Delete04Icon
        className="text-red cursor-pointer"
        onClick={handleDelete}
      />
    </div>
  );
}
