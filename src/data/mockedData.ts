import {
  Group,
  CardHomeData,
  GeneralStatus,
  PaymentStatus,
  Student,
  TrainCategory,
  WorkoutPlanModel,
  Training,
} from "../utils/tempTypes";

export const mockedGroups: Group[] = [
  {
    id: 1,
    label: "Corrida",
    subGroups: [
      { id: 1, label: "5km Iniciante" },
      { id: 2, label: "5km Avançado" },
      { id: 3, label: "10km Intermediário" },
      { id: 4, label: "Meia Maratona" },
      { id: 5, label: "Maratona Completa" },
    ],
  },
  {
    id: 2,
    label: "Triathlon",
    subGroups: [
      { id: 1, label: "Sprint Triathlon" },
      { id: 2, label: "Olympic Triathlon" },
      { id: 3, label: "Half Ironman" },
      { id: 4, label: "Ironman Completo" },
    ],
  },
  {
    id: 3,
    label: "Funcional",
    subGroups: [
      { id: 1, label: "Movimentos Básicos" },
      { id: 2, label: "HIIT Intermediário" },
      { id: 3, label: "Treino com Kettlebell" },
    ],
  },
  {
    id: 4,
    label: "Fortalecimento",
    subGroups: [
      { id: 1, label: "Fortalecimento de Core" },
      { id: 2, label: "Treino de Resistência" },
    ],
  },
];

export const mockedStudents: Student[] = [
  {
    id: 1,
    name: "Ana Silva",
    groupId: 1,
    subGroupId: 1,
    paymentStatus: PaymentStatus.Active,
    generalStatus: GeneralStatus.TrainingPending,
  },
  {
    id: 2,
    name: "Carlos Santos",
    groupId: 1,
    subGroupId: 2,
    paymentStatus: PaymentStatus.Overdue,
    generalStatus: GeneralStatus.SupportNeeded,
  },
  {
    id: 3,
    name: "Mariana Oliveira",
    groupId: 1,
    subGroupId: 3,
    paymentStatus: PaymentStatus.Inactive,
  },
  {
    id: 4,
    name: "Pedro Costa",
    groupId: 1,
    subGroupId: 4,
    paymentStatus: PaymentStatus.Active,
  },
  {
    id: 5,
    name: "Julia Ribeiro",
    groupId: 1,
    subGroupId: 5,
    paymentStatus: PaymentStatus.Overdue,
  },
  {
    id: 6,
    name: "Roberto Pereira",
    groupId: 2,
    subGroupId: 1,
    paymentStatus: PaymentStatus.Inactive,
    generalStatus: GeneralStatus.TrainingPending,
  },
  {
    id: 7,
    name: "Paula Almeida",
    groupId: 2,
    subGroupId: 2,
    paymentStatus: PaymentStatus.Active,
  },
  {
    id: 8,
    name: "Marcelo Carvalho",
    groupId: 2,
    subGroupId: 3,
    paymentStatus: PaymentStatus.Overdue,
  },
  {
    id: 9,
    name: "Fernanda Lima",
    groupId: 2,
    subGroupId: 4,
    paymentStatus: PaymentStatus.Inactive,
  },
  {
    id: 10,
    name: "Gustavo Souza",
    groupId: 3,
    subGroupId: 1,
    paymentStatus: PaymentStatus.Active,
  },
  {
    id: 11,
    name: "Larissa Cunha",
    groupId: 3,
    subGroupId: 2,
    paymentStatus: PaymentStatus.Overdue,
    generalStatus: GeneralStatus.SupportNeeded,
  },
  {
    id: 12,
    name: "Bruno Andrade",
    groupId: 3,
    subGroupId: 3,
    paymentStatus: PaymentStatus.Inactive,
  },
  {
    id: 13,
    name: "Ricardo Mendes",
    groupId: 4,
    subGroupId: 1,
    paymentStatus: PaymentStatus.Active,
  },
  {
    id: 14,
    name: "Sara Martins",
    groupId: 4,
    subGroupId: 2,
    paymentStatus: PaymentStatus.Overdue,
    generalStatus: GeneralStatus.TrainingPending,
  },
  {
    id: 15,
    name: "Fabiana Teixeira",
    groupId: 1,
    subGroupId: 1,
    paymentStatus: PaymentStatus.Inactive,
  },
  {
    id: 16,
    name: "Diego Moreira",
    groupId: 1,
    subGroupId: 2,
    paymentStatus: PaymentStatus.Active,
    generalStatus: GeneralStatus.SupportNeeded,
  },
  {
    id: 17,
    name: "Alice Costa",
    groupId: 1,
    subGroupId: 3,
    paymentStatus: PaymentStatus.Overdue,
  },
  {
    id: 18,
    name: "Thiago Correia",
    groupId: 1,
    subGroupId: 4,
    paymentStatus: PaymentStatus.Inactive,
  },
  {
    id: 19,
    name: "Beatriz Nunes",
    groupId: 1,
    subGroupId: 5,
    paymentStatus: PaymentStatus.Active,
    generalStatus: GeneralStatus.TrainingPending,
  },
  {
    id: 20,
    name: "Luis Felipe",
    groupId: 2,
    subGroupId: 1,
    paymentStatus: PaymentStatus.Overdue,
  },
  {
    id: 21,
    name: "Viviane Lopes",
    groupId: 2,
    subGroupId: 2,
    paymentStatus: PaymentStatus.Inactive,
  },
  {
    id: 22,
    name: "Rodrigo Azevedo",
    groupId: 2,
    subGroupId: 3,
    paymentStatus: PaymentStatus.Active,
  },
  {
    id: 23,
    name: "Isabela Castro",
    groupId: 2,
    subGroupId: 4,
    paymentStatus: PaymentStatus.Overdue,
  },
  {
    id: 24,
    name: "Lucas Rocha",
    groupId: 3,
    subGroupId: 1,
    paymentStatus: PaymentStatus.Active,
  },
  {
    id: 25,
    name: "Renata Farias",
    groupId: 3,
    subGroupId: 2,
    paymentStatus: PaymentStatus.Inactive,
    generalStatus: GeneralStatus.SupportNeeded,
  },
  {
    id: 26,
    name: "Eduardo Melo",
    groupId: 3,
    subGroupId: 3,
    paymentStatus: PaymentStatus.Overdue,
  },
  {
    id: 27,
    name: "Carla Vieira",
    groupId: 4,
    subGroupId: 1,
    paymentStatus: PaymentStatus.Active,
    generalStatus: GeneralStatus.TrainingPending,
  },
  {
    id: 28,
    name: "Fernando Silva",
    groupId: 4,
    subGroupId: 2,
    paymentStatus: PaymentStatus.Inactive,
  },
];

export const mockedMostRecentViewedStudents: CardHomeData[] = [
  {
    id: 1,
    name: "Joao Pedro",
  },
  {
    id: 2,
    name: "Camila Beatriz",
  },
  {
    id: 3,
    name: "Maria Clara",
  },
  {
    id: 4,
    name: "Pedro Henrique",
  },
  {
    id: 5,
    name: "Ana Paula",
  },
  {
    id: 6,
    name: "Lucas Silva",
  },
  {
    id: 7,
    name: "Mariana Santos",
  },
  {
    id: 8,
    name: "Rafael Oliveira",
  },
];

export const mockedCategories: TrainCategory[] = [
  {
    id: 1,
    label: "Corrida",
  },
  {
    id: 2,
    label: "Triathlon",
  },
  {
    id: 3,
    label: "Funcional",
  },
  {
    id: 4,
    label: "Fortalecimento",
  },
  {
    id: 5,
    label: "Outro",
  },
  {
    id: 6,
    label: "Academia",
  },
  {
    id: 7,
    label: "Musculação",
  },
  {
    id: 8,
    label: "Natação",
  },
  {
    id: 9,
    label: "Ciclismo",
  },
  {
    id: 10,
    label: "Outro",
  },
  {
    id: 11,
    label: "Academia",
  },
  {
    id: 12,
    label: "Musculação",
  },
  {
    id: 13,
    label: "Natação",
  },
  {
    id: 14,
    label: "Ciclismo",
  },
];

export const mockedModels: WorkoutPlanModel[] = [
  {
    id: 1,
    title: "Modelo 1",
  },
  {
    id: 2,
    title: "Modelo 2",
  },
  {
    id: 3,
    title: "Modelo 3",
  },
  {
    id: 4,
    title:
      "NOME MUITO GRANDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
  },
  {
    id: 5,
    title: "Modelo 5",
  },
];

export const mockedTrainings: Training[] = [
  {
    id: 1,
    title: "Pista Avançado 20x400",
    movements: [],
  },
  {
    id: 2,
    title: "Peito Intermediário na Academia",
    movements: [],
  },
  {
    id: 3,
    title: "Natação 40x50 Ritmo Sustentável",
    movements: [],
  },
  {
    id: 4,
    title: "Crossfit AMRAP 20 Min",
    movements: [],
  },
  {
    id: 5,
    title: "Corrida Fartlek 15km Longa Distância",
    movements: [],
  },
  {
    id: 6,
    title: "Funcional Resistência",
    movements: [],
  },
  {
    id: 7,
    title: "Pernas Avançado",
    movements: [],
  },
  {
    id: 8,
    title: "Ciclismo Moderado 30km",
    movements: [],
  },
  {
    id: 9,
    title: "Ombros e Trapézio Intermediário na Academia",
    movements: [],
  },
  {
    id: 10,
    title: "HIIT 15 Min Explosivo",
    movements: [],
  },
  {
    id: 11,
    title: "Costas Avançado",
    movements: [],
  },
  {
    id: 12,
    title: "Natação Livre Rápido 10x100",
    movements: [],
  },
  {
    id: 13,
    title: "Core",
    movements: [],
  },
  {
    id: 14,
    title: "Flexibilidade e Mobilidade Flexibilidade e Mobilidade Flexibilidade e Mobilidade Flexibilidade e Mobilidade Flexibilidade e Mobilidade",
    movements: [],
  },
  {
    id: 15,
    title: "Intervalado Corrida 5x800",
    movements: [],
  },
  {
    id: 16,
    title: "Full Body Iniciante",
    movements: [],
  },
  {
    id: 17,
    title: "Crossfit EMOM 15",
    movements: [],
  },
  {
    id: 18,
    title: "Pedalada 50km Resistência",
    movements: [],
  },
  {
    id: 19,
    title: "Braços Foco em Força",
    movements: [],
  },
  {
    id: 20,
    title: "Sprint Natação 20x25",
    movements: [],
  },
  {
    id: 21,
    title: "Peito e triceps",
    movements: [],
  },
  {
    id: 22,
    title: "Corrida intervalada iniciante",
    movements: [],
  },
];
