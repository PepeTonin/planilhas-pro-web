"use client";

export interface IPlanilhaRouteParams {
  params: {
    idPlanilha: string;
  };
}

export default function DetalhesPlanilha({ params }: IPlanilhaRouteParams) {
  return (
    <div className="flex-1 flex-col justify-center items-center text-white-f5 text-lg">
      <p>pagina de detalhes de treino</p>
      <p>id: {params.idPlanilha}</p>
      <p>nao implementado</p>
    </div>
  );
}
