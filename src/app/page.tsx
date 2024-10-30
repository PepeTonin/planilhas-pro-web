"use client";
import { useRouter } from "next/navigation";
import CardHome from "@/components/CardHome";

import {
  mockedStudents,
  mockedMostRecentViewedStudents,
} from "@/data/mockedData";
import { useEffect, useState } from "react";
import { PaymentStatus, Student } from "@/utils/sharedTypes";

export default function Home() {
  const [studentsNeedReview, setStudentsNeedReview] = useState<Student[]>();

  const router = useRouter();

  function navigateToAlunoId(id: number) {
    router.push(`/aluno/${id}`);
  }

  useEffect(() => {
    const filteredStudents = mockedStudents.filter(
      (student) =>
        student.generalStatus || student.paymentStatus === PaymentStatus.Overdue
    );
    setStudentsNeedReview(filteredStudents);
  }, []);

  return (
    <div className="flex flex-col flex-1 p-6 gap-4 overflow-y-auto h-[calc(100vh-5rem)] scrollbar-custom">
      <p className="text-primaryGreen text-3xl font-bold">
        Bem vindo, professor!
      </p>

      <div>
        <p className="text-gray-light text-2xl font-semibold mb-2">
          Notificações
        </p>
        <div className="flex flex-col justify-center items-center gap-2">
          {studentsNeedReview &&
            studentsNeedReview.map((item) => (
              <CardHome
                key={item.id}
                id={item.id}
                name={item.name}
                generalStatus={item.generalStatus}
                paymentStatus={item.paymentStatus}
                onClick={navigateToAlunoId}
              />
            ))}
        </div>
      </div>

      <div>
        <p className="text-gray-light text-2xl font-semibold mb-2">
          Últimos alunos visitados
        </p>
        <div className="flex flex-col justify-center items-center gap-2">
          {mockedMostRecentViewedStudents.map((item) => (
            <CardHome
              key={item.id}
              name={item.name}
              id={item.id}
              onClick={navigateToAlunoId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
