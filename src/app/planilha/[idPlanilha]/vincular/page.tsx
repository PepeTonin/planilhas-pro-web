"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link03Icon } from "hugeicons-react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter, I18nProvider } from "@react-aria/i18n";

import { Student } from "@/utils/sharedTypes";

import CardStudentLink from "@/components/CardStudentLink";
import SearchStudentsLink from "@/components/SearchStudentsLink";
import PrimaryButton from "@/components/PrimaryButton";

import { mockedStudents } from "@/data/mockedData";

export interface IVincularPlanilhaRouteParams {
  params: {
    idPlanilha: string;
  };
}

export default function VincularPlanilha({
  params,
}: IVincularPlanilhaRouteParams) {
  let formatter = useDateFormatter({ dateStyle: "long" });

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const [selectedDates, setSelectedDates] = useState({
    start: parseDate(formattedDate),
    end: parseDate(formattedDate),
  });

  const [allStudents, setAllStudents] = useState<Student[]>();

  const [selectedStudents, setSelectedStudents] = useState<Student[]>();

  const router = useRouter();

  useEffect(() => {
    setAllStudents(mockedStudents);
  }, []);

  function handleRemoveStudentFromSelecteds(student: Student) {
    if (!allStudents) return;
    if (!selectedStudents) return;
    setAllStudents((prev) => (prev ? [...prev, student] : [student]));
    const newSelectedStudents = selectedStudents.filter(
      (studentItem) => studentItem.id !== student.id
    );
    setSelectedStudents(newSelectedStudents);
  }

  function handleAddStudentToSelecteds(student: Student) {
    if (!allStudents) return;
    if (!selectedStudents) {
      setSelectedStudents([student]);
    } else {
      setSelectedStudents((prev) => (prev ? [...prev, student] : [student]));
    }
    const newAllStudents = allStudents.filter(
      (studentItem) => studentItem.id !== student.id
    );
    setAllStudents(newAllStudents);
  }

  function handleCancelAction() {
    router.back();
  }

  function handleConfirmAction() {
    router.push("/");
  }

  return (
    <div className="p-6 flex flex-1 flex-col gap-2">
      <header className="flex flex-col text-white-f5 gap-2">
        <div className="font-bold text-primaryGreen text-3xl flex flex-row gap-2 items-center">
          Planilha
          <span>
            <Link03Icon />
          </span>
          Aluno
        </div>
        <div className="flex flex-row gap-2">
          <p>Planilha: </p>
          <p>{params.idPlanilha}</p>
        </div>
      </header>
      <main className="flex flex-row gap-2 text-white-f5 max-h-[calc(100vh-260px)]">
        <I18nProvider locale="pt-br">
          <div className="flex flex-col flex-1 gap-2">
            <DateRangePicker
              label="Período"
              className="w-full"
              value={selectedDates}
              onChange={setSelectedDates}
              radius="sm"
            />
            {(!selectedStudents || selectedStudents.length === 0) && (
              <p className="text-yellow">Selecione pelo menos um aluno</p>
            )}
            {selectedStudents && selectedStudents.length === 1 && (
              <p>Aluno selecionado:</p>
            )}
            {selectedStudents && selectedStudents.length > 1 && (
              <p>Alunos selecionados:</p>
            )}
            {selectedStudents && selectedStudents.length > 0 && (
              <div className="flex flex-col gap-2 overflow-y-auto scrollbar-custom">
                {selectedStudents.map((student) => (
                  <CardStudentLink
                    key={student.id}
                    student={student}
                    handleDelete={handleRemoveStudentFromSelecteds}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-custom">
            {allStudents && (
              <SearchStudentsLink
                students={allStudents}
                handleSelect={handleAddStudentToSelecteds}
              />
            )}
          </div>
        </I18nProvider>
      </main>
      <footer className="flex flex-row justify-end gap-4">
        <PrimaryButton
          label="Cancelar"
          onClick={handleCancelAction}
          variation="red-bg"
        />
        <PrimaryButton label="Confirmar" onClick={handleConfirmAction} />
      </footer>
    </div>
  );
}
