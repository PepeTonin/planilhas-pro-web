import { useRef } from "react";
import { Search01Icon } from "hugeicons-react";

interface SearchBoxProps {
  placeholder?: string;
  fullWidth?: boolean;
}

export default function SearchBox({ placeholder, fullWidth }: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`${
        fullWidth ? "w-full" : "w-96"
      } flex flex-row justify-center items-center bg-white-f5 rounded-md gap-2 p-2`}
    >
      <Search01Icon className="text-gray-dark" size={24} />
      <input
        type="text"
        className="font-light text-gray-dark outline-none bg-transparent flex-1"
        placeholder={placeholder || "O que deseja?"}
        ref={inputRef}
      />
    </div>
  );
}
