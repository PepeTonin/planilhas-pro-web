export interface AccordionInnerGroup {
  id: number;
  label: string;
}

export interface AccordionGroup {
  id: number;
  label: string;
  subGroups: AccordionInnerGroup[];
}

export enum CardHomeStatus {
  PaymentOverdue = "PAYMENT_OVERDUE",
  TrainingPending = "TRAINING_PENDING",
  SupportNeeded = "SUPPORT_NEEDED",
}

export interface CardHomeData {
  id: number;
  name: string;
  status?: CardHomeStatus;
}

export interface CardGestaoAlunosData {
  id: number;
  name: string;
  group: string;
  subGroup: string;
  paymentStatus: "active" | "inactive" | "overdue";
}
