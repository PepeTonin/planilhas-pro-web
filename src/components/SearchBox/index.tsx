import { useRef } from "react";
import { Search01Icon } from "hugeicons-react";

export default function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex flex-row justify-center items-center bg-white-f5 w-96 rounded-lg gap-2 p-2"
    >
      <Search01Icon className="text-gray-dark" size={24} />
      <input
        type="text"
        className="font-light text-gray-dark outline-none bg-transparent flex-1"
        placeholder="O que deseja?"
        ref={inputRef}
      />
    </div>
  );
}
