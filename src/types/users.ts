export interface ReqUserLogin {
  email: string;
  senha: string;
}

export interface FetchedUserLogin {
  id: number;
  nome: string;
  email: string;
  role: "professor" | "aluno" | "admin";
}
