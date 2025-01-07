"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

import { getStudentByEmail, linkStudent } from "@/api/students";

import { isEmailValid } from "@/utils/validation";

import { Student } from "@/types/students";

import PrimaryButton from "@/components/PrimaryButton";
import EmailInput from "@/components/EmailInput";
import { useAppSelector } from "@/store/store";

const imageLoader = ({ src }: { src: string }) => {
  return src;
};

export default function VincularAluno() {
  const [email, setEmail] = useState("");

  const [loadingStudent, setLoadingStudent] = useState(false);
  const [fetchedStudent, setFetchedStudent] = useState<Student>();

  const [linkingStudent, setLinkingStudent] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  function formatDate(unformattedDate: string) {
    const date = new Date(unformattedDate);
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  }

  async function handleSearchStudent() {
    if (!isEmailValid(email)) {
      toast.error("E-mail inválido");
      return;
    }
    setLoadingStudent(true);
    const student = await getStudentByEmail(email);
    if (!student) {
      toast.error("Aluno não encontrado");
      setLoadingStudent(false);
      setFetchedStudent(undefined);
      return;
    }
    if (student.dataCadastro) {
      student.dataCadastro = formatDate(student.dataCadastro);
    }
    setFetchedStudent(student);
    setLoadingStudent(false);
  }

  async function handleLinkStudent() {
    if (!user || !fetchedStudent) return;
    setLinkingStudent(true);
    const response = await linkStudent(user.id, fetchedStudent.id);
    if (!response) {
      toast.error("Erro ao vincular aluno");
      setLinkingStudent(false);
      return;
    }
    toast.success("Aluno vinculado com sucesso");
    setLinkingStudent(false);
    setFetchedStudent(undefined);
    setEmail("");
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <Toaster position="top-right" />
      <p className="text-primaryGreen font-bold text-3xl w-full text-center">
        Vincular novo aluno
      </p>
      <div className="flex flex-col border-b-2 border-gray-light pb-6">
        <p className="text-white-f5 font-semibold text-xl">E-mail</p>
        <p className="text-white-f5 font-light text-base">
          Insira o e-mail do aluno que deseja vincular a você
        </p>
        <div className="py-2">
          <EmailInput onChange={setEmail} email={email} />
        </div>
        <PrimaryButton
          label="Pesquisar"
          onClick={handleSearchStudent}
          fullWidth
        />
      </div>
      {loadingStudent && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row">
            <div className="w-20 h-20 bg-gray-dark rounded-full animate-pulse" />
            <div className="flex-1 flex flex-col py-3 pl-3 justify-between">
              <div className="w-full h-4 bg-gray-dark rounded-full animate-pulse" />
              <div className="w-full h-4 bg-gray-dark rounded-full animate-pulse" />
            </div>
          </div>
          <div className="w-full h-10 bg-gray-dark rounded-full animate-pulse" />
        </div>
      )}
      {!loadingStudent && fetchedStudent && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row">
            <Image
              unoptimized
              loader={imageLoader}
              src={"https://i.pravatar.cc/300"}
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="flex flex-col py-3 pl-3 justify-between">
              <p className="text-gray-light font-semibold text-base">
                Nome:{" "}
                <span className="text-white-f5">{fetchedStudent.nome}</span>
              </p>
              <p className="text-gray-light font-semibold text-base">
                Cadastrado dia:{" "}
                <span className="text-white-f5">
                  {fetchedStudent.dataCadastro || "não informado"}
                </span>
              </p>
            </div>
          </div>
          <PrimaryButton
            label="Vincular"
            onClick={handleLinkStudent}
            fullWidth
          />
        </div>
      )}
    </div>
  );
}
