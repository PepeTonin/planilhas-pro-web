import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusSignSquareIcon } from "hugeicons-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Spinner } from "@nextui-org/spinner";

import {
  getSidebarGroups,
  setAccordionGroupOpened,
  setIsManagementSelected,
  setItemSubGroupSelected,
} from "@/store/features/sidebarSlice";

import Accordion from "../Accordion";
import PrimaryButton from "../PrimaryButton";

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

    // busca os treinos no bd
    // verifica qual o id que será usado para esse novo treino
    // navega para a rota /treino/id
    const newId = Math.floor(Math.random() * 10);

    router.push(`/treino/${newId}`);
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

  console.log("groups", groups);

  return (
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
        <div className="text-white-f5 flex flex-row w-full justify-between">
          <p className="text-left font-bold text-xl ">MEUS GRUPOS</p>
          <PlusSignSquareIcon className="hover:cursor-pointer" />
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
            />
          ))}
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
  );
}
