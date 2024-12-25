"use client";

export interface ITreinoRouteParams {
  params: {
    idTreino: string;
  };
}

export default function DetalhesTreino({ params }: ITreinoRouteParams) {
  return (
    <div className="flex-1 flex-col justify-center items-center text-white-f5 text-lg">
      <p>pagina de detalhes de treino</p>
      <p>id: {params.idTreino}</p>
      <p>nao implementado</p>
    </div>
  );
}
