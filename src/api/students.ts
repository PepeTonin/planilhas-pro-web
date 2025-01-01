import { DefaultPostResponse } from "@/types/shared";
import { axiosInstance as axios } from ".";

import { Student, StudentGestao } from "@/types/students";

export async function getAllStudents(
  idUser: number
): Promise<StudentGestao[] | undefined> {
  try {
    const response = await axios.get(`/alunos/${idUser}`);
    return response.data;
  } catch (error) {
    console.log("error in src/api/students.ts/getAllStudents(): ", error);
  }
}

export async function getStudentsByGroup(
  idUser: number,
  idGroup: number,
  idSubGroup?: number
): Promise<Student[] | undefined> {
  let url = "";
  if (idSubGroup) {
    url = `/alunos/${idUser}/grupo/${idGroup}/subgrupo/${idSubGroup}`;
  } else {
    url = `/alunos/${idUser}/grupo/${idGroup}`;
  }
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(
      "error in src/api/studentsGroups.ts/getStudentsByGroup(): ",
      error
    );
  }
}

export async function getStudentByEmail(
  email: string
): Promise<Student | undefined> {
  try {
    const response = await axios.get(`/aluno/email/${email}`);
    return response.data;
  } catch (error) {
    console.log("error in src/api/students.ts/getStudentByEmail(): ", error);
  }
}

export async function linkStudent(
  idProfessor: number,
  idAluno: number
): Promise<DefaultPostResponse | undefined> {
  console.log({
    idProfessor,
    idAluno,
  });
  try {
    const response = await axios.post(`/vincular/professor/aluno`, {
      idProfessor,
      idAluno,
    });

    return response.data;
  } catch (error) {
    console.log("error in src/api/students.ts/linkStudent(): ", error);
  }
}
