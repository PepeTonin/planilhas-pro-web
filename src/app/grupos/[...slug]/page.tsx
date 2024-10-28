"use client";
import { notFound, useRouter } from "next/navigation";

import CardStudentInGroup from "@/components/CardStudentInGroup";

import { mockedStudentsByGroup } from "@/utils/mockedData";

export interface IPlanilhaRouteParams {
  params: {
    slug: string[];
  };
}

export default function Grupos({ params }: IPlanilhaRouteParams) {
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

  return (
    <div className="flex flex-1 text-white-fff overflow-y-auto h-[calc(100vh-5rem)] scrollbar-custom p-6 outline-none">
      {params.slug.length === 1 && (
        <div>
          <p>ID GRUPO: {params.slug[0]}</p>
          <div className="flex flex-wrap justify-between gap-6">
            {mockedStudentsByGroup.map((item) => (
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
      )}
      {params.slug.length === 2 && (
        <div>
        <p>ID GRUPO: {params.slug[0]} - ID SUBGRUPO: {params.slug[1]}</p>
        <div className="flex flex-wrap justify-between gap-6">
          {mockedStudentsByGroup.map((item) => (
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
      )}
      {params.slug.length > 2 && notFound()}
    </div>
  );
}
