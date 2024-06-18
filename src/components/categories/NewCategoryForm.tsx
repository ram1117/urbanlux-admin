"use client";

import CreateCategoryAction from "@/app/actions/createcategory.action";
import FormSubmit from "@/atoms/FormSubmit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IEditCategoryFormState } from "@/interfaces";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const initialState: IEditCategoryFormState = {
  success: false,
  errors: { _form: [] },
};

interface NewCategoryFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewCategoryForm = ({ setOpen }: NewCategoryFormProps) => {
  const [formState, formAction] = useFormState(
    CreateCategoryAction,
    initialState,
  );

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
    }
  }, [formState.success, setOpen]);

  return (
    <form className="my-12 flex flex-col gap-4" action={formAction}>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="thumbnail" className="w-full md:w-1/4">
            New Thumbnail
          </Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept=".jpg,.jpeg,.png"
            className="rounded-none  w-full md:w-3/4"
          ></Input>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.thumbnail?.join(", ")}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="name" className="w-full md:w-1/4">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            className="rounded-none  w-full md:w-3/4"
          ></Input>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.name?.join(", ")}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="description" className="w-full md:w-1/4">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            className="rounded-none w-full md:w-3/4"
            rows={7}
          ></Textarea>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.description?.join(", ")}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="category_code" className="w-full md:w-1/4">
            Category Code
          </Label>
          <Input
            id="category_code"
            name="category_code"
            type="text"
            className="rounded-none  w-full md:w-3/4"
          ></Input>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.category_code?.join(", ")}
        </p>
      </div>
      <p className="text-xs text-red-800 text-center">
        {formState.errors._form?.join(", ")}
      </p>
      <div className="w-full flex justify-end">
        <FormSubmit></FormSubmit>
      </div>
    </form>
  );
};

export default NewCategoryForm;
