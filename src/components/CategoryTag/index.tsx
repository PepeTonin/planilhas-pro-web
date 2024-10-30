import { Cancel01Icon } from "hugeicons-react";

interface CategoryTagProps {
  id: number;
  label: string;
  removeCategory: (id: number) => void;
}

export default function CategoryTag({ id, label, removeCategory }: CategoryTagProps) {
  return (
    <div className="flex flex-row gap-1 items-center bg-gray-light rounded-full px-2 py-1 text-primaryDarkBg">
      <p className="text-xs ">{label}</p>
      <Cancel01Icon className="w-3 h-3 cursor-pointer" onClick={() => removeCategory(id)} />
    </div>
  );
}
