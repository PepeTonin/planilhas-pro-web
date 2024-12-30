export interface LinkedTraining {
  id: number;
  title: string;
}

export interface WorkoutPlanModel {
  id: number;
  title: string;
  workoutPlanId: number;
}

export interface TrainingBlock {
  id: number;
  title: string;
  linkedTraining: LinkedTraining;
}

export interface WorkoutPlanSession {
  id: number;
  title: string;
  trainingBlocks: TrainingBlock[];
}

export interface WorkoutPlan {
  id?: number;
  title: string;
  description: string;
  sessions: WorkoutPlanSession[];
}

export interface LinkWorkoutToStudentBodyReq {
  idProfessor: number;
  dataInicio: string;
  dataFim: string;
  alunos: number[];
}
