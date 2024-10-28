import { AtIcon } from "hugeicons-react";
import { useRef } from "react";

interface EmailInputProps {
  onChange: (value: string) => void;
}

export default function EmailInput({ onChange }: EmailInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      className="bg-gray-dark flex flex-row gap-1 p-2 rounded-lg"
      onClick={() => inputRef.current?.focus()}
    >
      <AtIcon className="text-gray-light" size={24} />
      <input
        type="email"
        id="email"
        className="outline-none text-white-f5 placeholder:text-gray-light bg-transparent w-full"
        placeholder="E-mail do aluno"
        ref={inputRef}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
