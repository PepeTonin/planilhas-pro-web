import { StudentGestao } from "@/types/students";
import { Delete04Icon } from "hugeicons-react";

interface CardStudentLinkProps {
  student: StudentGestao;
  handleDelete: (student: StudentGestao) => void;
}

export default function CardStudentLink({
  student,
  handleDelete,
}: CardStudentLinkProps) {
  return (
    <div className="flex flex-row rounded-md bg-white-f5 flex-1 gap-2 p-2">
      <p className="text-primaryDarkBg flex-1 line-clamp-1">{student.nome}</p>
      <Delete04Icon
        className="cursor-pointer text-red"
        onClick={() => handleDelete(student)}
      />
    </div>
  );
}
