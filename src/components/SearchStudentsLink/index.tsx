import { StudentGestao } from "@/types/students";
import { FetchedGroup } from "@/types/groups";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import SearchBox from "../SearchBox";
import StudentCard from "./StudentCard";
import LoadingFeedback from "../LoadingFeedback";

interface SearchStudentsLinkProps {
  valueName: string;
  handleNameChange: (value: string) => void;
  valueGroup: string;
  handleGroupChange: (group: FetchedGroup) => void;
  clearGroupInput: () => void;
  groups: FetchedGroup[] | undefined;
  loadingGroups: boolean;
  students: StudentGestao[] | undefined;
  loadingStudents: boolean;
  handleSelectStudent: (student: StudentGestao) => void;
}

export default function SearchStudentsLink({
  valueName,
  handleNameChange,
  valueGroup,
  handleGroupChange,
  clearGroupInput,
  groups,
  loadingGroups,
  students,
  loadingStudents,
  handleSelectStudent,
}: SearchStudentsLinkProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  function onGroupItemSelected(group: FetchedGroup) {
    handleGroupChange(group);
    onClose();
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-medium rounded-lg p-2">
      <div className="flex flex-col gap-1 border-b-2 border-b-white-f5 pb-4">
        <SearchBox
          fullWidth
          placeholder="Nome"
          value={valueName}
          onChange={handleNameChange}
        />
        <SearchBox
          fullWidth
          placeholder="Grupo"
          value={valueGroup}
          onClick={() => onOpen()}
          readOnly
          clearInput={valueGroup ? clearGroupInput : undefined}
        />
      </div>
      <div className="flex flex-col gap-1">
        {loadingStudents ? (
          <LoadingFeedback color="white" />
        ) : (
          students &&
          students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              handleSelect={handleSelectStudent}
            />
          ))
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-white-f5 text-primaryDarkBg">
          {() => (
            <>
              <ModalHeader className="font-bold">Filtrar por grupo</ModalHeader>
              <ModalBody className="font-semibold">
                {loadingGroups ? (
                  <LoadingFeedback color="secondary" />
                ) : (
                  <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto mb-2">
                    {groups ? (
                      groups.map((item) => (
                        <a
                          key={item.id}
                          onClick={() => onGroupItemSelected(item)}
                          className="hover:opacity-80 transition-transform-opacity cursor-pointer"
                        >
                          {item.nome}
                        </a>
                      ))
                    ) : (
                      <p className="text-red mb-2">
                        Não há grupos para selecionar
                      </p>
                    )}
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
