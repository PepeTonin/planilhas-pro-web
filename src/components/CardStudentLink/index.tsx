import { Student } from "@/utils/tempTypes";
import { Delete04Icon } from "hugeicons-react";

interface CardStudentLinkProps {
  student: Student;
  handleDelete: (student: Student) => void;
}

export default function CardStudentLink({
  student,
  handleDelete,
}: CardStudentLinkProps) {
  return (
    <div className="flex flex-row rounded-md bg-white-f5 flex-1 gap-2 p-2">
      <p className="text-primaryDarkBg flex-1 line-clamp-1">{student.name}</p>
      <Delete04Icon
        className="cursor-pointer text-red"
        onClick={() => handleDelete(student)}
      />
    </div>
  );
}
