import { axiosInstance as axios } from ".";
import { DefaultPostResponse } from "@/types/shared";
import { FetchedGroup } from "@/types/groups";

export async function getAllGroupsByIdProfessor(
  idProfessor: number
): Promise<FetchedGroup[] | undefined> {
  try {
    const response = await axios.get(`/grupos/${idProfessor}`);
    return response.data;
  } catch (error) {
    console.log(
      "error in src/api/grupos.ts/getAllGroupsByIdProfessor():",
      error
    );
  }
}

export async function createNewGroup(
  idProfessor: number,
  nome: string
): Promise<DefaultPostResponse | undefined> {
  try {
    const response = await axios.post("/novo/grupo", {
      idProfessor,
      nome,
    });
    return response.data;
  } catch (error) {
    console.log("error in src/api/grupos.ts/createNewGroup():", error);
  }
}

export async function createNewSubgroup(
  idGrupo: number,
  nome: string
): Promise<DefaultPostResponse | undefined> {
  try {
    const response = await axios.post("/novo/subgrupo", {
      idGrupo,
      nome,
    });
    return response.data;
  } catch (error) {
    console.log("error in src/api/grupos.ts/createNewSubgroup():", error);
  }
}
