import { FilterIcon } from "hugeicons-react";

interface FilterBoxProps {
  setFilter: (group: string, subGroup: string) => void;
}

export default function FilterBox({ setFilter }: FilterBoxProps) {
  return (
    <div className="rounded-lg border border-white-f5 text-white-f5 flex flex-row p-2 cursor-pointer gap-2">
      <FilterIcon onClick={() => setFilter("corrida", "intermediarios")} />
      <p>Filtrar</p>
    </div>
  );
}
