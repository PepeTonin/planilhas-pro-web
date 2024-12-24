import { axiosInstance as axios } from ".";

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
