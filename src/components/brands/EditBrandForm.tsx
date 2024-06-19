"use client";

import { IBrand, INewBrandFormState } from "@/interfaces";
import FormSubmit from "@/atoms/FormSubmit";
import { FormFile, FormInput, FormTextArea } from "@/atoms";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormState } from "react-dom";
import ImageWrapper from "@/atoms/ImageWrapper";
import EditBrandAction from "@/app/actions/editbrand.action";
import { useEffect } from "react";

interface EditBrandFormProps {
  item: IBrand;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: INewBrandFormState = {
  success: false,
  errors: { _form: [] },
};

const EditBrandForm = ({ item, setOpen }: EditBrandFormProps) => {
  const bindedAction = EditBrandAction.bind(null, item._id);
  const [formState, formAction] = useFormState(bindedAction, initialState);

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
    }
  }, [formState.success, setOpen]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-8">
      <div className="col-span-1">
        <ImageWrapper
          src={item.logo}
          alt={"brand logo"}
          imageSize={"w-full aspect-square mx-auto my-4 max-w-[400px] mx-auto"}
        ></ImageWrapper>
      </div>
      <form
        className="my-12 lg:my-4 col-span-1 lg:col-span-3 flex flex-col gap-4"
        action={formAction}
      >
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
          defaultValue={item.name}
        ></FormInput>

        <FormTextArea
          label={"Description"}
          name={"description"}
          errormsg={formState.errors.description?.join(", ")}
          defaultValue={item.description}
        ></FormTextArea>
        <FormInput
          label={"Brand Code"}
          type={"text"}
          name={"brand_code"}
          errormsg={formState.errors.brand_code?.join(", ")}
          readonly={true}
          disabled={true}
          defaultValue={item.brand_code}
        ></FormInput>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <Label htmlFor="create_store" className="w-full md:w-1/4">
              Create Store
            </Label>
            <RadioGroup
              name="create_store"
              id="create_store"
              defaultValue={item.create_store ? "yes" : "no"}
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
    </div>
  );
};

export default EditBrandForm;
