"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/store/store";

import { getAllStudents } from "@/api/students";

import { StudentGestao } from "@/types/students";

import CardGestaoAlunos from "@/components/CardGestaoAlunos";
import LoadingFeedback from "@/components/LoadingFeedback";
import PrimaryButton from "@/components/PrimaryButton";
import FilterBox from "@/components/FilterBox";

export default function Gestao() {
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const [allStudents, setAllStudents] = useState<StudentGestao[]>();
  const [loadingAllStudents, setLoadingAllStudents] = useState<boolean>(true);

  function navigateToVincularAluno() {
    router.push("/gestao/vincular-aluno");
  }

  function navigateToAlunoId(id: number) {
    router.push(`/aluno/${id}`);
  }

  function setFilter(group: string, subGroup: string) {
    console.log(`filtering by ${group} ${subGroup}`);
  }

  async function getStudents() {
    const response = await getAllStudents(user.id);
    console.log(response);
    if (response) {
      setAllStudents(response);
      setLoadingAllStudents(false);
    }
  }

  useEffect(() => {
    setLoadingAllStudents(true);
    getStudents();
  }, []);

  if (loadingAllStudents) {
    return <LoadingFeedback size="lg" label="Carregando..." />;
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
        {allStudents &&
          !loadingAllStudents &&
          allStudents.length > 0 &&
          allStudents.map((item) => (
            <CardGestaoAlunos
              key={item.id}
              id={item.id}
              name={item.nome}
              groupName={item.grupoNome}
              subGroupName={item.subGrupoNome}
              paymentStatus={item.statusPagamento}
              onExternalLinkClick={navigateToAlunoId}
            />
          ))}
      </div>
    </div>
  );
}
