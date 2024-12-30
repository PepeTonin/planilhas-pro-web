"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link03Icon } from "hugeicons-react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import debounce from "lodash.debounce";
import toast, { Toaster } from "react-hot-toast";

import { useAppSelector } from "@/store/store";
import { getAllStudents } from "@/api/students";
import { getWorkoutPlanById, linkWorkoutToStudent } from "@/api/workoutPlan";

import CardStudentLink from "@/components/CardStudentLink";
import SearchStudentsLink from "@/components/SearchStudentsLink";
import PrimaryButton from "@/components/PrimaryButton";

import { StudentGestao } from "@/types/students";
import { FetchedGroup } from "@/types/groups";
import { LinkWorkoutToStudentBodyReq, WorkoutPlan } from "@/types/workoutPlan";
import LoadingFeedback from "@/components/LoadingFeedback";

export interface IVincularPlanilhaRouteParams {
  params: {
    idPlanilha: string;
  };
}

export default function VincularPlanilha({
  params,
}: IVincularPlanilhaRouteParams) {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const [workoutPlanDetails, setWorkoutPlanDetails] = useState<WorkoutPlan>();
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [selectedDates, setSelectedDates] = useState({
    start: parseDate(formattedDate),
    end: parseDate(formattedDate),
  });
  const [searchNameInput, setSearchNameInput] = useState("");
  const [searchGroupInput, setSearchGroupInput] = useState<FetchedGroup>();

  const [availableStudents, setAvailableStudents] = useState<StudentGestao[]>();
  const [loadingStudents, setLoadingStudents] = useState(true);

  const [filteredStudents, setFilteredStudents] = useState<StudentGestao[]>();
  const [selectedStudents, setSelectedStudents] = useState<StudentGestao[]>();

  const [isSendingData, setIsSendingData] = useState(false);

  const router = useRouter();

  const { loadingGroups, groups } = useAppSelector((state) => state.sidebar);

  const { user } = useAppSelector((state) => state.auth);

  async function getWorkoutPlanDetails() {
    const details = await getWorkoutPlanById(Number(params.idPlanilha));
    setWorkoutPlanDetails(details);
    setLoadingDetails(false);
  }

  async function populateStudents() {
    setLoadingStudents(true);
    const students = await getAllStudents(user.id);
    if (students) {
      setAvailableStudents(students);
    }
    setLoadingStudents(false);
  }

  function handleRemoveStudentFromSelecteds(student: StudentGestao) {
    if (!selectedStudents) return;
    setAvailableStudents((prev) => (prev ? [...prev, student] : [student]));
    const newSelectedStudents = selectedStudents.filter(
      (studentItem) => studentItem.id !== student.id
    );
    setSelectedStudents(newSelectedStudents);
  }

  function handleAddStudentToSelecteds(student: StudentGestao) {
    if (!availableStudents) return;
    if (!selectedStudents) {
      setSelectedStudents([student]);
    } else {
      setSelectedStudents((prev) => (prev ? [...prev, student] : [student]));
    }
    const newStudentsAvailable = availableStudents.filter(
      (studentItem) => studentItem.id !== student.id
    );
    setAvailableStudents(newStudentsAvailable);
    if (filteredStudents) {
      const newStudentsFiltered = filteredStudents.filter(
        (studentItem) => studentItem.id !== student.id
      );
      setFilteredStudents(newStudentsFiltered);
    }
  }

  function handleSearchNameInputChange(value: string) {
    setSearchNameInput(value);
  }

  function handleSearchGroupInputChange(group: FetchedGroup) {
    setSearchGroupInput(group);
  }

  function handleClearSearchGroupInput() {
    setSearchGroupInput(undefined);
    setFilteredStudents(undefined);
  }

  function filterStudents() {
    let filtered = availableStudents || [];
    if (searchNameInput) {
      filtered = filtered.filter((student) =>
        student.nome.toLowerCase().includes(searchNameInput.toLowerCase())
      );
    }
    if (searchGroupInput) {
      filtered = filtered.filter(
        (student) => student.grupoId === searchGroupInput.id
      );
    }
    setFilteredStudents(filtered);
  }

  const debouncedFiltering = useCallback(
    debounce(() => filterStudents(), 500),
    [searchNameInput, searchGroupInput]
  );

  function handleCancelAction() {
    router.push("/");
  }

  async function handleConfirmAction() {
    setIsSendingData(true);
    if (selectedDates.start.toString() === selectedDates.end.toString()) {
      toast.error("Selecione um período válido");
      return;
    }
    if (!selectedStudents || selectedStudents.length === 0) {
      toast.error("Selecione pelo menos um aluno");
      return;
    }
    const requestBody: LinkWorkoutToStudentBodyReq = {
      idProfessor: user.id,
      dataInicio: selectedDates.start.toString(),
      dataFim: selectedDates.end.toString(),
      alunos: selectedStudents?.map((student) => student.id),
    };
    const status = await linkWorkoutToStudent(requestBody, params.idPlanilha);
    if (status !== 200) {
      toast.error("Erro ao vincular planilha");
      return;
    }
    toast.success("Planilha vinculada com sucesso");
    setTimeout(() => {
      setSelectedStudents(undefined);
      setFilteredStudents(undefined);
      router.push("/");
      setIsSendingData(false);
    }, 1000);
  }

  useEffect(() => {
    if (searchNameInput || searchGroupInput) debouncedFiltering();
    if (!searchNameInput && !searchGroupInput) setFilteredStudents(undefined);
  }, [searchGroupInput, searchNameInput]);

  useEffect(() => {
    populateStudents();
    getWorkoutPlanDetails();
  }, []);

  if (loadingDetails) {
    return <LoadingFeedback label="Carregando..." />;
  }

  return (
    <div className="p-6 flex flex-1 flex-col justify-between gap-2">
      <Toaster position="top-right" />
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
          <p>{workoutPlanDetails?.title}</p>
        </div>
      </header>
      <main className="flex flex-1 flex-row gap-2 text-white-f5 max-h-[calc(100vh-260px)]">
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
            <p>Total selecionado: {selectedStudents?.length}</p>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-custom">
            <SearchStudentsLink
              valueName={searchNameInput}
              handleNameChange={handleSearchNameInputChange}
              valueGroup={searchGroupInput?.nome || ""}
              handleGroupChange={handleSearchGroupInputChange}
              clearGroupInput={handleClearSearchGroupInput}
              groups={groups}
              loadingGroups={loadingGroups}
              students={filteredStudents || availableStudents}
              loadingStudents={loadingStudents}
              handleSelectStudent={handleAddStudentToSelecteds}
            />
          </div>
        </I18nProvider>
      </main>
      <footer className="flex flex-row justify-end gap-4">
        <PrimaryButton
          label="Cancelar"
          onClick={handleCancelAction}
          variation="red-bg"
          isLoading={isSendingData}
        />
        <PrimaryButton label="Confirmar" onClick={handleConfirmAction} isLoading={isSendingData} />
      </footer>
    </div>
  );
}
