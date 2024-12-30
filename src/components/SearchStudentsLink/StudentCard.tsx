import { UserAdd02Icon } from "hugeicons-react";

import { StudentGestao } from "@/types/students";

interface StudentCardProps {
  student: StudentGestao;
  handleSelect: (student: StudentGestao) => void;
}

export default function StudentCard({
  student,
  handleSelect,
}: StudentCardProps) {
  return (
    <div
      onClick={() => handleSelect(student)}
      className="flex flex-row w-full rounded-md bg-white-f5 cursor-pointer hover:opacity-90 text-primaryDarkBg py-1 px-2 items-center"
    >
      <p className="flex-1">{student.nome}</p>
      <UserAdd02Icon size={20} />
    </div>
  );
}
