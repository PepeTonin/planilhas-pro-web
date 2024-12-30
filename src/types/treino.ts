export interface TrainingMovement {
  id: number;
  title: string;
  description: MovementDescription[];
}

export interface MovementDescription {
  id: number;
  description: string;
}

export interface Training {
  title: string;
  description: string;
  movements: TrainingMovement[];
}

export interface TrainCategory {
  id: number;
  label: string;
}

export interface MovementDescriptionResponse {
  descricaoMovimentoId: number;
  descricao: string;
}

export interface TrainingMovementResponse {
  movimentoId: number;
  titulo: string;
  descricoes: MovementDescriptionResponse[];
}

export interface TrainingResponse {
  treinoId: number;
  titulo: string;
  descricao: string;
}
