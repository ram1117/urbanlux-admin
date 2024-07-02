"use client";

import CreateCategoryAction from "@/app/actions/categories/createcategory.action";
import { FormFile, FormInput, FormTextArea } from "@/atoms";
import FormSubmit from "@/atoms/FormSubmit";
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
      <FormFile
        name={"thumbnail"}
        label={"New Thumbnail"}
        errorMsg={formState.errors.thumbnail?.join(", ")}
      ></FormFile>

      <FormInput
        label={"Name"}
        type={"text"}
        name={"name"}
        errormsg={formState.errors.name?.join(", ")}
      ></FormInput>
      <FormTextArea
        label={"Description"}
        name={"description"}
        errormsg={formState.errors.description?.join(", ")}
      ></FormTextArea>
      <FormInput
        label={" Category Code"}
        type={"text"}
        name={"category_code"}
        errormsg={formState.errors.category_code?.join(", ")}
      ></FormInput>

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
