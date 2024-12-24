"use client";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { ArrowRight02Icon } from "hugeicons-react";

import { useAppSelector } from "@/store/store";

import { getStudentsByGroup } from "@/api/students";

import { Student } from "@/types/students";

import CardStudentInGroup from "@/components/CardStudentInGroup";
import LoadingFeedback from "@/components/LoadingFeedback";

export interface IPlanilhaRouteParams {
  params: {
    slug: string[];
  };
}

export default function Grupos({ params }: IPlanilhaRouteParams) {
  const router = useRouter();
  const { groups, loadingGroups } = useAppSelector((state) => state.sidebar);
  const { user } = useAppSelector((state) => state.auth);

  const [groupName, setGroupName] = useState("");
  const [subGroupName, setSubGroupName] = useState("");

  const [students, setStudents] = useState<Student[]>();
  const [loadingStudents, setLoadingStudents] = useState(true);

  function navigateToAlunoId(id: number) {
    router.push(`/aluno/${id}`);
  }

  function onInfoClick(id: number) {
    console.log(id);
  }

  function onCurrentTrainingClick(id: number) {
    console.log(id);
  }

  function onPreviousTrainingsClick(id: number) {
    console.log(id);
  }

  async function fillData() {
    const parentGroup = groups.find(
      (group) => group.id === Number(params.slug[0])
    );
    if (!parentGroup) return;
    setGroupName(parentGroup.nome);
    if (params.slug.length === 1) {
      const response = await getStudentsByGroup(user.id, parentGroup.id);
      if (response) {
        setStudents(response);
        setLoadingStudents(false);
      }
      return;
    }
    const subGroup = parentGroup.subGrupos.find(
      (subGroup) => subGroup.id === Number(params.slug[1])
    );
    if (!subGroup) return;
    setSubGroupName(subGroup.nome);
    const response = await getStudentsByGroup(
      user.id,
      parentGroup.id,
      subGroup.id
    );
    if (response) {
      setStudents(response);
      setLoadingStudents(false);
    }
  }

  useEffect(() => {
    setLoadingStudents(true);
    fillData();
  }, [params.slug]);

  if (loadingGroups || loadingStudents) {
    return <LoadingFeedback size="lg" label="Carregando..." />;
  }

  return (
    <>
      {params.slug.length > 2 && notFound()}
      <div className="flex flex-col flex-1 text-white-fff overflow-y-auto h-[calc(100vh-5rem)] scrollbar-custom p-6 outline-none gap-4">
        {params.slug.length === 1 ? (
          <div>
            <p className="text-primaryGreen font-bold text-3xl">{groupName}</p>
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-gray-light font-semibold text-3xl">
              {groupName}
            </p>
            <ArrowRight02Icon className="self-center text-gray-light" />
            <p className="text-primaryGreen font-bold text-2xl self-end">
              {subGroupName}
            </p>
          </div>
        )}
        <div className="flex flex-wrap justify-between gap-6">
          {students &&
            !loadingStudents &&
            students.map((item) => (
              <CardStudentInGroup
                key={item.id}
                name={item.nome}
                id={item.id}
                onExternalLinkClick={navigateToAlunoId}
                onCurrentTrainingClick={onCurrentTrainingClick}
                onInfoClick={onInfoClick}
                onPreviousTrainingsClick={onPreviousTrainingsClick}
              />
            ))}
        </div>
      </div>
    </>
  );
}
