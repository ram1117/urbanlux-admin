import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormFileProps {
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  errorMsg?: string;
}

export const FormFile = ({
  name,
  label,
  accept = ".jpg,.jpeg,.png",
  multiple = false,
  errorMsg = "",
}: FormFileProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <Label htmlFor={name} className="w-full md:w-1/4">
          {label}
        </Label>
        <Input
          id={name}
          name={name}
          type="file"
          accept={accept}
          className="rounded-none  w-full md:w-3/4"
          multiple={multiple}
        ></Input>
      </div>
      <p className="text-xs text-red-800 text-center">{errorMsg}</p>
    </div>
  );
};
