"use client";

import EditCategoryAction from "@/app/actions/editcategory.action";
import FormSubmit from "@/atoms/FormSubmit";
import ImageWrapper from "@/atoms/ImageWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ICategory, IEditCategoryFormState } from "@/interfaces";
import { useEffect } from "react";
import { useFormState } from "react-dom";

interface EditCategoryFormProps {
  item: ICategory;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: IEditCategoryFormState = {
  success: false,
  errors: { _form: [] },
};

const EditCategoryForm = ({ item, setOpen }: EditCategoryFormProps) => {
  const bindedAction = EditCategoryAction.bind(null, item._id);
  const [formState, formAction] = useFormState(bindedAction, initialState);
  useEffect(() => {
    if (formState.success) {
      setOpen(false);
    }
  }, [formState.success, setOpen]);

  return (
    <div className="my-4 grid grid-cols-1 lg:grid-cols-4 gap-4 p-8">
      <div className="col-span-1">
        <ImageWrapper
          src={item.thumbnail}
          alt={"category thumbnail"}
          imageSize={"w-full aspect-square mx-auto my-4 max-w-[400px] mx-auto"}
        ></ImageWrapper>
      </div>

      <form
        className="my-12 lg:my-4 col-span-1 lg:col-span-3 flex flex-col gap-4"
        action={formAction}
      >
        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <Label htmlFor="name" className="w-full md:w-1/4">
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
              defaultValue={item.name}
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
              defaultValue={item.description}
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
              defaultValue={item.category_code}
              className="rounded-none  w-full md:w-3/4"
              readOnly
              disabled
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
    </div>
  );
};

export default EditCategoryForm;
