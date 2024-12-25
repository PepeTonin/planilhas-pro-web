import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusSignSquareIcon } from "hugeicons-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import {
  getSidebarGroups,
  setAccordionGroupOpened,
  setIsManagementSelected,
  setItemSubGroupSelected,
} from "@/store/features/sidebarSlice";

import Accordion from "../Accordion";
import PrimaryButton from "../PrimaryButton";
import { createNewGroup, createNewSubgroup } from "@/api/sidebar";

export enum ModalType {
  CREATE_GROUP,
  CREATE_SUBGROUP,
}

export interface ISelectedItem {
  parentId: number;
  itemId: number;
}

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    accordionGroupOpened,
    isManagementSelected,
    itemGroupSelected,
    groups,
    loadingGroups,
  } = useAppSelector((state) => state.sidebar);

  const [selectedModal, setSelectedModal] = useState<ModalType>(
    ModalType.CREATE_GROUP
  );
  const [modalInputValue, setModalInputValue] = useState("");
  const [parentGroupId, setParentGroupId] = useState(-1);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const modalObject = {
    [ModalType.CREATE_GROUP]: {
      title: "Criar novo grupo",
      inputLabel: "Título do novo grupo",
      onClick: handleCreateNewGroup,
    },
    [ModalType.CREATE_SUBGROUP]: {
      title: "Criar novo subgrupo",
      inputLabel: "Título do novo subgrupo",
      onClick: handleCreateNewSubroup,
    },
  };

  async function handleCreateNewGroup() {
    const response = await createNewGroup(user.id, modalInputValue);
    if (response) {
      onClose();
      dispatch(getSidebarGroups(user.id));
      setModalInputValue("");
    }
  }

  async function handleCreateNewSubroup() {
    const response = await createNewSubgroup(parentGroupId, modalInputValue);
    if (response) {
      onClose();
      dispatch(getSidebarGroups(user.id));
      setModalInputValue("");
    }
  }

  function openModal(type: ModalType, groupId?: number) {
    setSelectedModal(type);
    if (type === ModalType.CREATE_SUBGROUP && groupId) {
      setParentGroupId(groupId);
    }
    onOpen();
  }

  function onManagementClick() {
    dispatch(setIsManagementSelected(true));
    dispatch(setAccordionGroupOpened(-1));
    dispatch(setItemSubGroupSelected({ parentId: -1, itemId: -1 }));
    router.push("/gestao");
  }

  function onAccordionArrowIconClick(id: number) {
    dispatch(setAccordionGroupOpened(accordionGroupOpened === id ? -1 : id));
  }

  function onGroupClick(id: number) {
    dispatch(setIsManagementSelected(false));
    dispatch(setItemSubGroupSelected({ parentId: id, itemId: -1 }));
    router.push(`/grupos/${id}`);
  }

  function onSubGroupClick(parentId: number, itemId: number) {
    dispatch(setIsManagementSelected(false));
    dispatch(setItemSubGroupSelected({ parentId, itemId }));
    router.push(`/grupos/${parentId}/${itemId}`);
  }

  function handleCreateNewTraining() {
    dispatch(setIsManagementSelected(false));
    dispatch(setAccordionGroupOpened(-1));
    dispatch(setItemSubGroupSelected({ parentId: -1, itemId: -1 }));
    router.push(`/treino/novo-treino`);
  }

  function handleCreateNewWorkoutPlan() {
    dispatch(setIsManagementSelected(false));
    dispatch(setAccordionGroupOpened(-1));
    dispatch(setItemSubGroupSelected({ parentId: -1, itemId: -1 }));

    // busca as planilhas no bd
    // verifica qual o id que será usado para essa nova planilha
    // navega para a rota /planilha/id
    const newId = Math.floor(Math.random() * 10);

    router.push(`/planilha/${newId}`);
  }

  useEffect(() => {
    if (user) {
      dispatch(getSidebarGroups(user.id));
    }
  }, [user]);

  return (
    <>
      <main className="h-full w-60 border-r border-gray-light flex flex-col justify-between items-center">
        <div className="flex flex-col pt-8 w-52 gap-4">
          <p
            className={`cursor-pointer hover:opacity-80 text-left font-bold text-xl ${
              isManagementSelected ? "text-primaryGreen" : "text-white-f5"
            }`}
            onClick={onManagementClick}
          >
            GESTÃO DE ALUNOS
          </p>
          <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto scrollbar-custom">
            <div className="text-white-f5 flex flex-row w-full justify-between">
              <p className="text-left font-bold text-xl ">MEUS GRUPOS</p>
              <PlusSignSquareIcon
                className="hover:cursor-pointer"
                onClick={() => openModal(ModalType.CREATE_GROUP)}
              />
            </div>
            {loadingGroups && <Spinner />}
            {!loadingGroups &&
              groups &&
              groups.length > 0 &&
              groups.map((item) => (
                <Accordion
                  key={item.id}
                  id={item.id}
                  label={item.nome}
                  innerItems={item.subGrupos}
                  openedAccordionItem={accordionGroupOpened}
                  onAccordionArrowIconClick={onAccordionArrowIconClick}
                  onGroupClick={onGroupClick}
                  onSubGroupClick={onSubGroupClick}
                  selectedItem={itemGroupSelected}
                  onPlusSignClick={openModal}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pb-8 w-52 gap-4">
          <PrimaryButton
            label="Criar novo treino"
            onClick={handleCreateNewTraining}
          />
          <PrimaryButton
            label="Criar nova planilha"
            onClick={handleCreateNewWorkoutPlan}
          />
        </div>
      </main>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="font-bold">{modalObject[selectedModal].title}</p>
              </ModalHeader>
              <ModalBody>
                <Input
                  label={modalObject[selectedModal].inputLabel}
                  type="text"
                  value={modalInputValue}
                  onValueChange={setModalInputValue}
                />
              </ModalBody>
              <ModalFooter>
                <PrimaryButton
                  label="Criar"
                  onClick={modalObject[selectedModal].onClick}
                  fullWidth
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
