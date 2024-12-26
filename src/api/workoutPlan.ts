import { axiosInstance as axios } from ".";
import { DefaultPostResponse } from "@/types/shared";
import { WorkoutPlan, WorkoutPlanModel } from "@/types/workoutPlan";

function mapRequestBody(idProfessor: number, workoutPlan: WorkoutPlan) {
  return {
    idProfessor,
    titulo: workoutPlan.title,
    descricao: workoutPlan.description,
    sessoes: workoutPlan.sessions.map((session) => ({
      titulo: session.title,
      blocos: session.trainingBlocks.map((block) => ({
        titulo: block.title,
        idTreino: block.linkedTraining.id,
      })),
    })),
  };
}

export async function createNewWorkoutPlan(
  idProfessor: number,
  workoutPlan: WorkoutPlan
): Promise<DefaultPostResponse | undefined> {
  const requestBody = mapRequestBody(idProfessor, workoutPlan);
  try {
    const response = await axios.post("/planilha/nova", requestBody);
    return response.data;
  } catch (error) {
    console.log("error in src/api/workoutPlan.ts/createWorkoutPlan(): ", error);
  }
}

export async function getWorkoutPlanModels(
  idProfessor: number
): Promise<WorkoutPlanModel[] | undefined> {
  try {
    const response = await axios.get(`/planilha/modelos/${idProfessor}`);
    return response.data;
  } catch (error) {
    console.log(
      "error in src/api/workoutPlan.ts/getWorkoutPlanModels(): ",
      error
    );
  }
}

export async function getWorkoutPlanById(
  idPlanilha: number
): Promise<WorkoutPlan | undefined> {
  try {
    const response = await axios.get(`/planilha/${idPlanilha}`);
    return response.data;
  } catch (error) {
    console.log(
      "error in src/api/workoutPlan.ts/getWorkoutPlanById(): ",
      error
    );
  }
}
