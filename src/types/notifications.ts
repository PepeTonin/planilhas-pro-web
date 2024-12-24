export enum PaymentStatus {
  Active = "ativo",
  Inactive = "inativo",
  Overdue = "atrasado",
}

export enum TrainingStatus {
  TrainingPending = "treino pendente",
  SupportNeeded = "suporte necessario",
}

export interface StudentsWithNotifications {
  id: number;
  nome: string;
  situacaoPagamento: PaymentStatus;
  situacaoTreino: TrainingStatus;
}
