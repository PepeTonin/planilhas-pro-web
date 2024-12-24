import { PaymentStatus } from "./notifications";

export interface Student {
  id: number;
  nome: string;
}

export interface StudentGestao extends Student {
  grupoId: number | undefined;
  grupoNome: string | undefined;
  subGrupoId: number | undefined;
  subGrupoNome: string | undefined;
  statusPagamento: PaymentStatus;
}