"use client";

import FormSubmit from "@/atoms/FormSubmit";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import AddImageAction from "@/app/actions/addimage.action";
import { useFormState } from "react-dom";
import { IAddImageFormState } from "@/interfaces";

interface AddImageFormProps {
  id: string;
  name: string;
}

const initialValue: IAddImageFormState = { errors: { _form: [] } };

const AddImageForm = ({ id, name }: AddImageFormProps) => {
  const bindedAction = AddImageAction.bind(null, id, name);
  const [formState, formAction] = useFormState(bindedAction, initialValue);

  return (
    <form className="flex flex-col gap-4 py-8" action={formAction}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="image" className="w-full md:w-1/4">
            Select Image
          </Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept=".jpg,.jpeg,.png"
            className="rounded-none  w-full md:w-3/4"
          ></Input>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.image?.join(", ")}
        </p>
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="thumbnail" className="w-full md:w-1/4">
            Set as thumbnail
          </Label>
          <RadioGroup
            name="thumbnail"
            id="thumbnail"
            defaultValue="no"
            className="flex flex-row"
          >
            <RadioGroupItem value="yes" id="yes"></RadioGroupItem>
            <Label htmlFor="yes">Yes</Label>
            <RadioGroupItem value="no" id="no"></RadioGroupItem>
            <Label htmlFor="no">No</Label>
          </RadioGroup>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.thumbnail?.join(", ")}
        </p>
        <p className="text-xs text-red-800 text-center">
          {formState.errors._form?.join(", ")}
        </p>
        <div className="flex justify-end">
          <FormSubmit className="w-max" text="Add image"></FormSubmit>
        </div>
      </div>
      <p className="text-sm text-green-700">
        {formState.success && "Image added"}
      </p>
    </form>
  );
};

export default AddImageForm;
