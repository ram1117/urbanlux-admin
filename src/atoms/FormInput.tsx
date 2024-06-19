import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  label: string;
  type: "file" | "text" | "password";
  name: string;
  errormsg?: string;
  defaultValue?: string;
  disabled?: boolean;
  readonly?: boolean;
}

export const FormInput = ({
  label,
  type,
  name,
  errormsg = "",
  defaultValue = undefined,
  disabled = false,
  readonly = false,
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <Label htmlFor={name} className="w-full md:w-1/4">
          {label}
        </Label>
        <Input
          id={name}
          name={name}
          type={type}
          className="rounded-none w-full md:w-3/4"
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readonly}
        ></Input>
      </div>
      <p className="text-xs text-red-800 text-center">{errormsg}</p>
    </div>
  );
};
