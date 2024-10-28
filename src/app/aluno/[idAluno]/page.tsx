export interface IAlunoRouteParams {
  params: {
    idAluno: string;
  };
}

export default function Aluno({ params }: IAlunoRouteParams) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <p className="text-primaryGreen text-3xl font-bold">Página de aluno</p>
      <div className="bg-white-f5 rounded-3xl p-2 flex justify-center">
        <p className="text-primaryDarkBg text-lg font-semibold">
          ID do aluno: {params.idAluno}
        </p>
      </div>
      <p className="text-red text-lg font-semibold">
        Não implementada
      </p>
    </div>
  );
}
