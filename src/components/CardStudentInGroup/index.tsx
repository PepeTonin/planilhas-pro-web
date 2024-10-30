import {
  LinkSquare01Icon,
  Calendar03Icon,
  Task01Icon,
  RunningShoesIcon,
} from "hugeicons-react";

interface CardStudentInGroupProps {
  id: number;
  name: string;
  onExternalLinkClick: (id: number) => void;
  onInfoClick: (id: number) => void;
  onCurrentTrainingClick: (id: number) => void;
  onPreviousTrainingsClick: (id: number) => void;
}

export default function CardStudentInGroup({
  name,
  id,
  onExternalLinkClick,
  onInfoClick,
  onCurrentTrainingClick,
  onPreviousTrainingsClick,
}: CardStudentInGroupProps) {
  return (
    <div className="flex flex-col justify-center items-center font-semibold bg-white-f5 rounded-lg p-4 flex-1 min-w-64 gap-4">
      <div className="flex flex-row justify-between items-center w-full text-primaryDarkBg border-b-2 border-primaryDarkBg pb-2">
        <p className="text-md">{name}</p>
        <LinkSquare01Icon
          onClick={() => onExternalLinkClick(id)}
          className="cursor-pointer"
        />
      </div>

      <div
        onClick={() => onInfoClick(id)}
        className="cursor-pointer flex flex-row justify-start items-center w-full bg-primaryDarkBg p-2 rounded-lg gap-2"
      >
        <Task01Icon />
        <p>Informações</p>
      </div>

      <div
        onClick={() => onCurrentTrainingClick(id)}
        className="cursor-pointer flex flex-row justify-start items-center w-full bg-primaryDarkBg p-2 rounded-lg gap-2"
      >
        <RunningShoesIcon />
        <p>Treino atual</p>
      </div>

      <div
        onClick={() => onPreviousTrainingsClick(id)}
        className="cursor-pointer flex flex-row justify-start items-center w-full bg-primaryDarkBg p-2 rounded-lg gap-2"
      >
        <Calendar03Icon />
        <p>Treinos anteriores</p>
      </div>
    </div>
  );
}
