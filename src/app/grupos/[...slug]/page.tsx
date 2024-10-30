"use client";
import { notFound, useRouter } from "next/navigation";
import { ArrowRight02Icon } from "hugeicons-react";

import CardStudentInGroup from "@/components/CardStudentInGroup";

import { mockedStudents, mockedGroups } from "@/data/mockedData";
import { useEffect, useState } from "react";

export interface IPlanilhaRouteParams {
  params: {
    slug: string[];
  };
}

export default function Grupos({ params }: IPlanilhaRouteParams) {
  const [groupName, setGroupName] = useState("");
  const [subGroupName, setSubGroupName] = useState("");

  const router = useRouter();

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

  function setGroupAndSubGroupNames() {
    const parentGroup = mockedGroups.find(
      (group) => group.id === Number(params.slug[0])
    );

    if (!parentGroup) return;

    setGroupName(parentGroup.label);

    if (params.slug.length === 1) return;

    const subGroup = parentGroup.subGroups.find(
      (subGroup) => subGroup.id === Number(params.slug[1])
    );

    if (!subGroup) return;

    setSubGroupName(subGroup.label);
  }

  useEffect(() => {
    setGroupAndSubGroupNames();
  }, [params.slug]);

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
          {mockedStudents.map((item) => (
            <CardStudentInGroup
              key={item.id}
              name={item.name}
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
