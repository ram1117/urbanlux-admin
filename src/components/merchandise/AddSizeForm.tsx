"use client";

import AddSizeAction from "@/app/actions/addsize.action";
import { FormInput } from "@/atoms";
import FormSubmit from "@/atoms/FormSubmit";
import { IAddSizeFormState } from "@/interfaces";
import { useEffect } from "react";
import { useFormState } from "react-dom";

interface AddSizeFormProps {
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialState: IAddSizeFormState = { success: false, errors: {} };

const AddSizeForm = ({ id, setOpen }: AddSizeFormProps) => {
  const bindedAction = AddSizeAction.bind(null, id);
  const [formState, formAction] = useFormState(bindedAction, initialState);
  useEffect(() => {
    if (formState.success) {
      setOpen(false);
    }
  }, [formState.success, setOpen]);

  return (
    <form
      className="flex flex-col md:flex-row gap-4 items-start"
      action={formAction}
    >
      <FormInput
        label={"New Size"}
        type={"text"}
        name={"size"}
        errormsg={formState.errors.size?.join(", ")}
      ></FormInput>
      <p className="text-xs text-red-800">
        {formState.errors._form?.join(",")}
      </p>
      <FormSubmit text="Add"></FormSubmit>
    </form>
  );
};

export default AddSizeForm;
