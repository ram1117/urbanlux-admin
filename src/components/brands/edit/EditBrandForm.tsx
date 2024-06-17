"use client";

import { IBrand, INewBrandFormState } from "@/interfaces";
import FormSubmit from "@/atoms/FormSubmit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import ImageWrapper from "@/atoms/ImageWrapper";
import EditBrandAction from "@/app/actions/editbrand.action";

interface EditBrandFormProps {
  item: IBrand;
}

const initialState: INewBrandFormState = { errors: { _form: [] } };

const EditBrandForm = ({ item }: EditBrandFormProps) => {
  const bindedAction = EditBrandAction.bind(null, item._id);
  const [formState, formAction] = useFormState(bindedAction, initialState);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-8">
      <div className="col-span-1">
        <ImageWrapper
          src={item.logo}
          alt={"brand logo"}
          imageSize={"w-full aspect-square mx-auto my-4"}
        ></ImageWrapper>
      </div>
      <form
        className="w-11/12 md:w-4/5 max-w-[768px] my-12 lg:my-4 col-span-1 lg:col-span-3 flex flex-col gap-4"
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
              defaultValue={item.name}
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
              defaultValue={item.description}
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
              defaultValue={item.brand_code}
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
