interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export default function PrimaryButton({
  label,
  onClick,
  fullWidth,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-primaryGreen text-primaryDarkBg font-semibold py-2 px-4 rounded-xl h-12 transition-opacity hover:opacity-80 ${
        fullWidth ? "w-full" : "w-52"
      }`}
    >
      {label}
    </button>
  );
}
