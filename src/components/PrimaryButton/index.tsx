interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  variation?: "green-bg" | "white-bg";
}

export default function PrimaryButton({
  label,
  onClick,
  fullWidth,
  variation = "green-bg",
}: PrimaryButtonProps) {
  const variationClasses = {
    "green-bg": "bg-primaryGreen",
    "white-bg": "bg-white-f5",
  };
  return (
    <button
      onClick={onClick}
      className={`${
        variationClasses[variation]
      } text-primaryDarkBg font-semibold py-2 px-4 rounded-lg h-12 transition-opacity hover:opacity-80 ${
        fullWidth ? "w-full" : "w-52"
      }`}
    >
      {label}
    </button>
  );
}
