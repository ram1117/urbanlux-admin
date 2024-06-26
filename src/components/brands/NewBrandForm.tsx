"use client";

import NewBrandAction from "@/app/actions/newbrand.action";
import { FormFile, FormInput, FormTextArea } from "@/atoms";
import FormSubmit from "@/atoms/FormSubmit";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { INewBrandFormState } from "@/interfaces";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const initialState: INewBrandFormState = {
  success: false,
  errors: { _form: [] },
};

interface NewBrandFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewBrandForm = ({ setOpen }: NewBrandFormProps) => {
  const [formState, formAction] = useFormState(NewBrandAction, initialState);

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
    }
  }, [formState.success, setOpen]);

  return (
    <form className="my-12 flex flex-col gap-4" action={formAction}>
      <FormFile
        name={"logo"}
        label={"Logo"}
        errorMsg={formState.errors.logo?.join(", ")}
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
        label={"Brand Code"}
        type={"text"}
        name={"brand_code"}
        errormsg={formState.errors.brand_code?.join(", ")}
      ></FormInput>

      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="create_store" className="w-full md:w-1/4">
            Create Store
          </Label>
          <RadioGroup
            name="create_store"
            id="create_store"
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
          {formState.errors.create_store?.join(", ")}
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

export default NewBrandForm;
