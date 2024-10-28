"use client";
import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import Image from "next/image";
import EmailInput from "@/components/EmailInput";

const imageLoader = ({ src }: { src: string }) => {
  return src;
};

export default function VincularAluno() {
  const [email, setEmail] = useState("");

  const [fetchedStudent, setFetchedStudent] = useState();

  function handleSearchStudent() {
    console.log("Pesquisar aluno");
  }

  function handleLinkStudent() {
    console.log("Vincular aluno");
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <p className="text-primaryGreen font-bold text-3xl w-full text-center">
        Vincular novo aluno
      </p>
      <div className="flex flex-col border-b-2 border-gray-light pb-6">
        <p className="text-white-f5 font-semibold text-xl">E-mail</p>
        <p className="text-white-f5 font-light text-base">
          Insira o e-mail do aluno que deseja vincular a você
        </p>
        <div className="py-2">
          <EmailInput onChange={setEmail} />
        </div>
        <PrimaryButton
          label="Pesquisar"
          onClick={handleSearchStudent}
          fullWidth
        />
      </div>
      {!fetchedStudent && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-row">
            <Image
              loader={imageLoader}
              src={"https://i.pravatar.cc/300"}
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="flex flex-col py-3 pl-3 justify-between">
              <p className="text-gray-light font-semibold text-base">
                Nome: <span className="text-white-f5">Nome Teste</span>
              </p>
              <p className="text-gray-light font-semibold text-base">
                Cadastrado dia:{" "}
                <span className="text-white-f5">27/10/2024</span>
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
