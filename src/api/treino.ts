import { axiosInstance as axios } from ".";
import { DefaultPostResponse } from "@/types/shared";
import { Training } from "@/types/treino";

function mapRequestBody(idProfessor: number, treino: Training) {
  return {
    idProfessor,
    titulo: treino.title,
    descricao: treino.description,
    movimentos: treino.movements.map((movement) => ({
      id: movement.id,
      titulo: movement.title,
      descricoes: movement.description.map((description) => ({
        id: description.id,
        descricao: description.description,
      })),
    })),
  };
}

export async function createNewTreino(
  idProfessor: number,
  treino: Training
): Promise<DefaultPostResponse | undefined> {
  const requestBody = mapRequestBody(idProfessor, treino);
  try {
    const response = await axios.post(`/treino/novo`, requestBody);
    return response.data;
  } catch (error) {
    console.log("error in src/api/treino.ts/createNewTreino(): ", error);
  }
}
