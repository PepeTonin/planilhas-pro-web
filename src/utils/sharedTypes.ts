export interface SubGroup {
  id: number;
  label: string;
}

export interface Group {
  id: number;
  label: string;
  subGroups: SubGroup[];
}

export interface Student {
  id: number;
  name: string;
  groupId: number;
  subGroupId: number;
  paymentStatus: PaymentStatus;
  generalStatus?: GeneralStatus;
}

export enum PaymentStatus {
  Active = "active",
  Inactive = "inactive",
  Overdue = "overdue",
}

export enum GeneralStatus {
  TrainingPending = "trainingPending",
  SupportNeeded = "supportNeeded",
}

export interface CardHomeData {
  id: number;
  name: string;
  status?: GeneralStatus;
}

export interface TrainCategory {
  id: number;
  label: string;
}
