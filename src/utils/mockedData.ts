import {
  AccordionGroup,
  CardGestaoAlunosData,
  CardHomeData,
  CardHomeStatus,
} from "./sharedTypes";

export const mockedAccordionItems: AccordionGroup[] = [
  {
    id: 1,
    label: "Corrida",
    subGroups: [
      { id: 1, label: "5km Iniciante" },
      { id: 2, label: "10km Intermediário" },
      { id: 3, label: "Meia Maratona" },
      { id: 4, label: "Maratona Completa" },
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
      { id: 4, label: "Treino Funcional Avançado" },
    ],
  },
  {
    id: 4,
    label: "Fortalecimento",
    subGroups: [
      { id: 1, label: "Fortalecimento de Core" },
      { id: 2, label: "Treino de Resistência" },
      { id: 3, label: "Fortalecimento Muscular Completo" },
      { id: 4, label: "Treino de Hipertrofia" },
    ],
  },
];

export const mockedHomeNotifications: CardHomeData[] = [
  {
    id: 1,
    name: "Joao Pedro",
    status: CardHomeStatus.PaymentOverdue,
  },
  {
    id: 2,
    name: "Camila Beatriz",
    status: CardHomeStatus.SupportNeeded,
  },
  {
    id: 3,
    name: "Maria Clara",
    status: CardHomeStatus.TrainingPending,
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

export const mockedAllStudentsGestao: CardGestaoAlunosData[] = [
  {
    id: 1,
    name: "Joao Pedro",
    group: "Corrida",
    subGroup: "Intermediários",
    paymentStatus: "overdue",
  },
  {
    id: 2,
    name: "Camila Beatriz",
    group: "Triathlon",
    subGroup: "Sprint Triathlon",
    paymentStatus: "inactive",
  },
  {
    id: 3,
    name: "Maria Clara",
    group: "Funcional",
    subGroup: "Movimentos Básicos",
    paymentStatus: "active",
  },
  {
    id: 4,
    name: "Pedro Henrique",
    group: "Fortalecimento",
    subGroup: "Fortalecimento de Core",
    paymentStatus: "inactive",
  },
  {
    id: 5,
    name: "Ana Paula",
    group: "Corrida",
    subGroup: "Meia Maratona",
    paymentStatus: "active",
  },
  {
    id: 6,
    name: "Lucas Silva",
    group: "Triathlon",
    subGroup: "Olympic Triathlon",
    paymentStatus: "inactive",
  },
  {
    id: 7,
    name: "Mariana Santos",
    group: "Funcional",
    subGroup: "Treino com Kettlebell",
    paymentStatus: "active",
  },
  {
    id: 8,
    name: "Rafael Oliveira",
    group: "Fortalecimento",
    subGroup: "Treino de Resistência",
    paymentStatus: "inactive",
  },
];

export const mockedStudentsByGroup: { id: number; name: string }[] = [
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
  {
    id: 9,
    name: "Joao Pedro",
  },
  {
    id: 10,
    name: "Camila Beatriz",
  },
  {
    id: 11,
    name: "Maria Clara",
  },
  {
    id: 12,
    name: "Pedro Henrique",
  },
];
