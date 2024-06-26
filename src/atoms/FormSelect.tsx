import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBrand, ICategory } from "@/interfaces";

interface FormSelectProps {
  name: string;
  label: string;
  items: ICategory[] | IBrand[];
  errorMsg?: string;
  defaultValue?: string;
}

export const FormSelect = ({
  name,
  label,
  items,
  errorMsg = "",
  defaultValue = undefined,
}: FormSelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <Label htmlFor={name} className="w-full md:w-1/4">
          {label}
        </Label>
        <Select name={name} defaultValue={defaultValue}>
          <SelectTrigger className="w-full md:w-3/4 rounded-none">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent id={name}>
            <SelectGroup>
              {items.map((item: ICategory | IBrand) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <p className="text-xs text-red-800 text-center">{errorMsg}</p>
    </div>
  );
};
