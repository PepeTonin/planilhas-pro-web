"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { login } from "@/store/features/authSlice";
import { getNotifications } from "@/store/features/homeSlice";

import { ReqUserLogin } from "@/types/users";

import CardHome from "@/components/CardHome";
import LoadingFeedback from "@/components/LoadingFeedback";

// mocked apagar
import { mockedMostRecentViewedStudents } from "@/data/mockedData";
// mocked apagar

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isLogging } = useAppSelector((state) => state.auth);
  const { notifications, loadingNotifications } = useAppSelector(
    (state) => state.home
  );

  const extraInfo = false;

  function navigateToAlunoId(id: number) {
    router.push(`/aluno/${id}`);
  }

  function populateNotifications() {
    dispatch(getNotifications(user.id));
  }

  function loginProfessor() {
    const userToLogin: ReqUserLogin = {
      email: "joao.silva@email.com",
      senha: "senha123",
    };
    dispatch(login(userToLogin));
  }

  useEffect(() => {
    loginProfessor();
    populateNotifications();
  }, []);

  if (isLogging || loadingNotifications) {
    return <LoadingFeedback size="lg" label="Carregando..." />;
  }

  return (
    <div className="flex flex-col flex-1 p-6 gap-4 overflow-y-auto h-[calc(100vh-5rem)] scrollbar-custom">
      <p className="text-primaryGreen text-3xl font-bold">
        Bem vindo, {user.nome}!
      </p>

      <div>
        <p className="text-gray-light text-2xl font-semibold mb-2">
          Notificações
        </p>
        <div className="flex flex-col justify-center items-start gap-2 max-w-[600px]">
          {!loadingNotifications &&
            notifications &&
            notifications.map((item) => (
              <CardHome
                key={item.id}
                id={item.id}
                name={item.nome}
                trainingStatus={item.situacaoTreino}
                paymentStatus={item.situacaoPagamento}
                onClick={navigateToAlunoId}
              />
            ))}
        </div>
      </div>
      {extraInfo && (
        <div>
          <p className="text-gray-light text-2xl font-semibold mb-2">
            Últimos alunos visitados
          </p>
          <div className="flex flex-col justify-center items-center gap-2 max-w-[600px]">
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
      )}
    </div>
  );
}
