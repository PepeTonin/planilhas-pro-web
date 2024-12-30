import { useRef } from "react";
import { Search01Icon, CancelCircleIcon } from "hugeicons-react";

interface SearchBoxProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder: string;
  fullWidth?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  clearInput?: () => void;
}

export default function SearchBox({
  value,
  onChange,
  placeholder,
  fullWidth,
  readOnly,
  onClick,
  clearInput,
}: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear(e: React.MouseEvent<SVGElement, MouseEvent>) {
    e.stopPropagation();
    if (!!clearInput) clearInput();
  }

  return (
    <div
      onClick={!!onClick ? onClick : () => inputRef.current?.focus()}
      className={`${
        fullWidth ? "w-full" : "w-96"
      } flex flex-row justify-center items-center bg-white-f5 rounded-md gap-2 p-2`}
    >
      <Search01Icon className="text-gray-dark" size={24} />
      <input
        type="text"
        className="font-light text-gray-dark outline-none bg-transparent flex-1"
        placeholder={placeholder}
        ref={inputRef}
        readOnly={readOnly}
        value={value}
        onChange={(e) => !!onChange && onChange(e.target.value)}
      />
      {!!clearInput && (
        <CancelCircleIcon
          className="text-gray-dark cursor-pointer z-10"
          size={24}
          onClick={(e) => handleClear(e)}
        />
      )}
    </div>
  );
}
