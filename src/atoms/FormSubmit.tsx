"use client";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loadingspinner";
import { useFormStatus } from "react-dom";

interface FormSubmitProps {
  text?: string;
  color?: string;
  disabled?: boolean;
  className?: string;
  variant?:
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

const FormSubmit = ({
  text = "Submit",
  color = "#f9f9f9",
  disabled = false,
  className = "",
  variant = "default",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      className={`${className} ${disabled ? "opacity-40" : "opacity:100"} min-w-[120px]`}
      disabled={disabled}
    >
      {pending ? <LoadingSpinner color={color}></LoadingSpinner> : text}
    </Button>
  );
};

export default FormSubmit;
