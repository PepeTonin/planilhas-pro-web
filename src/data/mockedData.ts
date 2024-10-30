import {
  Group,
  CardHomeData,
  GeneralStatus,
  PaymentStatus,
  Student,
  TrainCategory,
} from "../utils/sharedTypes";

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
  }
];
