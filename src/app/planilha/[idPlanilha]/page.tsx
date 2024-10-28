export interface IPlanilhaRouteParams {
  params: {
    idPlanilha: string;
  };
}

export default function DetalhesPlanilha({ params }: IPlanilhaRouteParams) {
  return <div>Detalhes planilha {params.idPlanilha}</div>;
}
