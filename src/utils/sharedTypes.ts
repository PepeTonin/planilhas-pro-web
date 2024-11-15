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

export interface TrainingMovement {
  id: number;
  title: string;
  description: TrainingDescription[];
}

export interface TrainingDescription {
  id: number;
  description: string;
}

export interface Training {
  id: number;
  title: string;
  movements: TrainingMovement[];
}

export interface WorkoutPlanModel {
  id: number;
  title: string;
}

export interface TrainingBlock {
  id: number;
  title: string;
  linkedTraining: Training;
}

export interface WorkoutPlanBlock {
  id: number;
  title: string;
  trainingBlocks: TrainingBlock[];
}

export interface WorkoutPlan {
  id: number;
  title: string;
  blocks: WorkoutPlanBlock[];
}
