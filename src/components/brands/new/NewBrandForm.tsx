"use client";

import NewBrandAction from "@/app/actions/newbrand.action";
import FormSubmit from "@/atoms/FormSubmit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { INewBrandFormState } from "@/interfaces";
import { useFormState } from "react-dom";

const initialState: INewBrandFormState = {
  success: false,
  errors: { _form: [] },
};

const NewBrandForm = () => {
  const [formState, formAction] = useFormState(NewBrandAction, initialState);

  return (
    <form
      className="w-11/12 md:w-4/5 max-w-[768px] mx-auto my-12 flex flex-col gap-4"
      action={formAction}
    >
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="logo" className="w-full md:w-1/4">
            Logo
          </Label>
          <Input
            id="logo"
            name="logo"
            type="file"
            accept=".jpg,.jpeg,.png"
            className="rounded-none  w-full md:w-3/4"
          ></Input>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.logo?.join(", ")}
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
          <Label htmlFor="brand_code" className="w-full md:w-1/4">
            Brand Code
          </Label>
          <Input
            id="brand_code"
            name="brand_code"
            type="text"
            className="rounded-none  w-full md:w-3/4"
          ></Input>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.brand_code?.join(", ")}
        </p>
      </div>
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
