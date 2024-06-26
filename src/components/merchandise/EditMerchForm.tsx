"use client";

import {
  IBrand,
  ICategory,
  IEditMerchFormState,
  IMerchandise,
} from "@/interfaces";
import FormSubmit from "@/atoms/FormSubmit";
import EditMerchAction from "@/app/actions/editmerch.action";
import { useFormState } from "react-dom";
import { FormInput, FormTextArea, FormSelect } from "@/atoms";
import { useEffect } from "react";

interface EditMerchFormProps {
  merchandise: IMerchandise;
  brands: IBrand[];
  categories: ICategory[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: IEditMerchFormState = { success: false, errors: {} };
const EditMerchForm = ({
  merchandise,
  brands,
  categories,
  setOpen,
}: EditMerchFormProps) => {
  const bindedAction = EditMerchAction.bind(null, merchandise._id);
  const [formState, formAction] = useFormState(bindedAction, initialState);

  useEffect(() => {
    if (formState.success) setOpen(false);
  }, [formState.success, setOpen]);

  return (
    <form className="my-12 flex flex-col gap-4" action={formAction}>
      <FormInput
        label={"Name"}
        type={"text"}
        name={"name"}
        defaultValue={merchandise.name}
        errormsg={formState.errors.name?.join(", ")}
      ></FormInput>

      <FormTextArea
        label={"Description"}
        name={"description"}
        defaultValue={merchandise.description}
        errormsg={formState.errors.description?.join(",")}
      ></FormTextArea>

      <FormTextArea
        label={`Features - separate by "/"`}
        name={"features"}
        errormsg={formState.errors.features?.join(",")}
        defaultValue={merchandise.features.join("/")}
      ></FormTextArea>

      <FormSelect
        name={"brand"}
        label={"Select Brand"}
        items={brands}
        defaultValue={merchandise.brand._id}
        errorMsg={formState.errors.brand?.join(", ")}
      ></FormSelect>

      <FormSelect
        name={"category"}
        label={"Select Category"}
        items={categories}
        errorMsg={formState.errors.category?.join(", ")}
        defaultValue={merchandise.category._id}
      ></FormSelect>

      <FormInput
        label={"Color"}
        type={"text"}
        name={"color"}
        errormsg={formState.errors.color?.join(", ")}
        defaultValue={merchandise.color}
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

export default EditMerchForm;
