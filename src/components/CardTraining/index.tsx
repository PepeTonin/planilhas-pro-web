import { Delete04Icon } from "hugeicons-react";
import { useEffect, useState } from "react";

interface CardTrainingProps {
  idTrainingMov: number;
  idDescriptionItem?: number;
  variation: "training-movement" | "training-description";
  innerText: string;
  selectedItem?: number;
  handleSelect?: (id: number) => void;
  handleDeleteTrainingMov?: (id: number) => void;
  handleDeleteDescriptionItem?: (
    idDescriptionItem: number,
    idTrainingMov: number
  ) => void;
  handleUpdateDescriptionItem?: (
    idTrainingMov: number,
    idDescriptionItem: number,
    newDescription: string
  ) => void;
}

export default function CardTraining({
  idTrainingMov,
  idDescriptionItem,
  variation,
  innerText,
  selectedItem,
  handleSelect,
  handleDeleteTrainingMov,
  handleDeleteDescriptionItem,
  handleUpdateDescriptionItem,
}: CardTrainingProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(innerText);
  }, [innerText]);

  useEffect(() => {
    if (!handleUpdateDescriptionItem || idDescriptionItem == null) return;
    handleUpdateDescriptionItem(idTrainingMov, idDescriptionItem!, inputValue);  
  }, [inputValue]);

  const containerBgColorObject = {
    "training-movement": "bg-primaryDarkBg ",
    "training-description": "bg-gray-dark ",
  };

  function handleDelete() {
    if (handleDeleteTrainingMov) handleDeleteTrainingMov(idTrainingMov);
    if (handleDeleteDescriptionItem && idDescriptionItem != null)
      handleDeleteDescriptionItem(idDescriptionItem, idTrainingMov);
  }

  return (
    <div
      className={`${containerBgColorObject[variation]} rounded-md flex flex-row px-2 py-1 gap-2`}
    >
      {variation === "training-movement" && handleSelect && (
        <p
          className={`flex-1 cursor-pointer ${
            selectedItem === idTrainingMov
              ? "text-primaryGreen"
              : "text-white-f5"
          }`}
          onClick={() => handleSelect(idTrainingMov)}
        >
          {innerText}
        </p>
      )}
      {variation === "training-description" && (
        <input
          type="text"
          placeholder="Nova descrição"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`flex-1 text-white-f5 outline-none ${containerBgColorObject[variation]}`}
        />
      )}

      <Delete04Icon
        className="text-red cursor-pointer"
        onClick={handleDelete}
      />
    </div>
  );
}
