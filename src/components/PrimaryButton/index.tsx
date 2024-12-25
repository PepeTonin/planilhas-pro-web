import { Spinner } from "@nextui-org/spinner";

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  variation?: "red-bg" | "green-bg" | "white-bg" | "light-gray-bg";
}

export default function PrimaryButton({
  label,
  onClick,
  fullWidth,
  variation = "green-bg",
  isLoading = false,
}: PrimaryButtonProps) {
  const variationClasses = {
    "green-bg": "bg-primaryGreen",
    "white-bg": "bg-white-f5",
    "light-gray-bg": "bg-gray-light",
    "red-bg": "bg-red",
  };
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`${
        variationClasses[variation]
      } text-primaryDarkBg font-semibold py-2 px-4 rounded-lg h-12 transition-opacity hover:opacity-80 ${
        fullWidth ? "w-full" : "w-52"
      }`}
    >
      {isLoading ? <Spinner color="secondary" /> : label}
    </button>
  );
}
