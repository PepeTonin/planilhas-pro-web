export interface ITreinoRouteParams {
  params: {
    idTreino: string;
  };
}

export default function DetalhesTreino({ params }: ITreinoRouteParams) {
  return <div>DetalhesTreino {params.idTreino}</div>;
}
