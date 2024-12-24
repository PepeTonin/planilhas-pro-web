import { Spinner, SpinnerProps } from "@nextui-org/spinner";

export default function LoadingFeedback({
  color,
  size,
  label,
  labelColor,
}: SpinnerProps) {
  return (
    <div className="flex items-center justify-center flex-1">
      <Spinner
        color={color || "primary"}
        labelColor={labelColor || "primary"}
        size={size || "md"}
        label={label}
      />
    </div>
  );
}
