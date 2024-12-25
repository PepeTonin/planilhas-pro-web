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
