import { axiosInstance as axios } from ".";

import { StudentsWithNotifications } from "@/types/notifications";

export async function getHomeNotifications(
  idProfessor: number
): Promise<StudentsWithNotifications[] | undefined> {
  try {
    const response = await axios.get(`/notificacoes/${idProfessor}`);
    return response.data;
  } catch (error) {
    console.log(
      "error in src/api/grupos.ts/getAllGroupsByIdProfessor(): ",
      error
    );
  }
}
