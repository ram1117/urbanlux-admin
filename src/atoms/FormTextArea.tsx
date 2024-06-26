import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormTextAreasProps {
  label: string;
  name: string;
  errormsg?: string;
  rows?: number;
  defaultValue?: string;
}

export const FormTextArea = ({
  label,
  name,
  errormsg,
  rows = 7,
  defaultValue = undefined,
}: FormTextAreasProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <Label htmlFor={name} className="w-full md:w-1/4">
          {label}
        </Label>
        <Textarea
          id={name}
          name={name}
          className="rounded-none w-full md:w-3/4"
          rows={rows}
          defaultValue={defaultValue}
        ></Textarea>
      </div>
      <p className="text-xs text-red-800 text-center">{errormsg}</p>
    </div>
  );
};
