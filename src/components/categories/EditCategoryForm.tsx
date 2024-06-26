"use client";

import EditCategoryAction from "@/app/actions/editcategory.action";
import { FormFile, FormInput, FormTextArea } from "@/atoms";
import FormSubmit from "@/atoms/FormSubmit";
import ImageWrapper from "@/atoms/ImageWrapper";
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
          defaultValue={item.name}
        ></FormInput>

        <FormTextArea
          label={"Description"}
          name={"description"}
          errormsg={formState.errors.description?.join(", ")}
          defaultValue={item.description}
        ></FormTextArea>

        <FormInput
          label={"Category Code"}
          type={"text"}
          name={"category_code"}
          errormsg={formState.errors.category_code?.join(", ")}
          defaultValue={item.category_code}
          disabled={true}
          readonly={true}
        ></FormInput>

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
