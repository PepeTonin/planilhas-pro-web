export interface FetchedSubGroup {
  id: number;
  nome: string;
}

export interface FetchedGroup {
  id: number;
  nome: string;
  subGrupos: FetchedSubGroup[];
}