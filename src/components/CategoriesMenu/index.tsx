import { RefObject, useEffect } from "react";
import { Cancel01Icon } from "hugeicons-react";

import { TrainCategory } from "@/utils/sharedTypes";

interface CategoriesMenuProps {
  data: TrainCategory[];
  innerRef: RefObject<HTMLDivElement>;
  setIsCategoriesMenuOpen: (value: boolean) => void;
  onSelectCategory: (category: TrainCategory) => void;
}

export default function CategoriesMenu({
  data,
  innerRef,
  setIsCategoriesMenuOpen,
  onSelectCategory,
}: CategoriesMenuProps) {
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event: MouseEvent) {
    if (innerRef.current && !innerRef.current.contains(event.target as Node)) {
      setIsCategoriesMenuOpen(false);
    }
  }

  function handleSelectCategory(category: TrainCategory) {
    onSelectCategory(category);
    setIsCategoriesMenuOpen(false);
  }

  return (
    <div
      ref={innerRef}
      className="absolute left-[400px] top-[220px] z-10 w-64 py-2 px-4 rounded-lg bg-white-f5"
    >
      <div
        className="flex flex-row-reverse cursor-pointer"
        onClick={() => setIsCategoriesMenuOpen(false)}
      >
        <Cancel01Icon size={18} />
      </div>
      <div className="flex flex-col max-h-[300px] overflow-y-scroll">
        {data.map((item) => (
          <p
            key={item.id}
            onClick={() => handleSelectCategory(item)}
            className="cursor-pointer hover:text-opacity-70 text-gray-dark"
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}
