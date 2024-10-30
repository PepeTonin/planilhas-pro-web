"use client";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/PrimaryButton";
import CardGestaoAlunos from "@/components/CardGestaoAlunos";

import { mockedStudents } from "@/data/mockedData";
import FilterBox from "@/components/FilterBox";

export default function Gestao() {
  const router = useRouter();

  function navigateToVincularAluno() {
    router.push("/gestao/vincular-aluno");
  }

  function navigateToAlunoId(id: number) {
    router.push(`/aluno/${id}`);
  }

  function setFilter(group: string, subGroup: string) {
    console.log(`filtering by ${group} ${subGroup}`);
  }

  return (
    <div className="p-6 flex flex-1 flex-col gap-4 overflow-y-auto h-[calc(100vh-5rem)] scrollbar-custom outline-none">
      <header className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <p className="text-primaryGreen font-bold text-3xl">
            Gestão de alunos
          </p>
          <PrimaryButton
            label="Vincular novo aluno"
            onClick={navigateToVincularAluno}
          />
        </div>
        <div className="flex justify-start">
          <FilterBox setFilter={setFilter} />
        </div>
      </header>
      <div className="flex flex-col gap-2">
        {mockedStudents.map((item) => (
          <CardGestaoAlunos
            key={item.id}
            id={item.id}
            name={item.name}
            groupId={item.groupId}
            subGroupId={item.groupId}
            paymentStatus={item.paymentStatus}
            onExternalLinkClick={navigateToAlunoId}
          />
        ))}
      </div>
    </div>
  );
}
