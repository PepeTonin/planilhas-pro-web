import { Student } from "@/utils/sharedTypes";

import SearchBox from "../SearchBox";
import StudentCard from "./StudentCard";

interface SearchStudentsLinkProps {
  students: Student[];
  handleSelect: (student: Student) => void;
}

export default function SearchStudentsLink({
  students,
  handleSelect,
}: SearchStudentsLinkProps) {

  return (
    <div className="flex flex-col gap-4 bg-gray-medium rounded-lg p-2">
      <div className="flex flex-col gap-1 border-b-2 border-b-white-f5 pb-4">
        <SearchBox fullWidth placeholder="Nome" />
        <SearchBox fullWidth placeholder="Grupo" />
      </div>
      <div className="flex flex-col gap-1">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            handleSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
