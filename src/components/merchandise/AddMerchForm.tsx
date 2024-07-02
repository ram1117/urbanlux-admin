"use client";

import { IAddMerchFormState, IBrand, ICategory } from "@/interfaces";
import FormSubmit from "@/atoms/FormSubmit";
import AddMerchAction from "@/app/actions/merchandise/addmerch.action";
import { useFormState } from "react-dom";
import { FormInput, FormTextArea, FormSelect, FormFile } from "@/atoms";

interface AddMerchFormProps {
  brands: IBrand[];
  categories: ICategory[];
}

const initialState: IAddMerchFormState = { errors: {} };

const AddMerchForm = ({ brands, categories }: AddMerchFormProps) => {
  const [formState, formAction] = useFormState(AddMerchAction, initialState);
  return (
    <form
      className="my-12 flex flex-col gap-4 max-w-[768px] mx-auto"
      action={formAction}
    >
      <FormInput
        label={"Name"}
        type={"text"}
        name={"name"}
        errormsg={formState.errors.name?.join(", ")}
      ></FormInput>

      <FormTextArea
        label={"Description"}
        name={"description"}
        errormsg={formState.errors.description?.join(",")}
      ></FormTextArea>

      <FormTextArea
        label={`Features - separate by "/"`}
        name={"features"}
        errormsg={formState.errors.features?.join(",")}
      ></FormTextArea>

      <FormSelect
        name={"brand"}
        label={"Select Brand"}
        items={brands}
        errorMsg={formState.errors.brand?.join(", ")}
      ></FormSelect>

      <FormSelect
        name={"category"}
        label={"Select Category"}
        items={categories}
        errorMsg={formState.errors.category?.join(", ")}
      ></FormSelect>

      <FormInput
        label={`Sizes- "," separated`}
        type={"text"}
        name={"sizes"}
        errormsg={formState.errors.sizes?.join(", ")}
      ></FormInput>

      <FormInput
        label={"Color"}
        type={"text"}
        name={"color"}
        errormsg={formState.errors.color?.join(", ")}
      ></FormInput>

      <FormFile
        name={"thumbnail"}
        label={"Thumbnail"}
        errorMsg={formState.errors.sizes?.join(",")}
      ></FormFile>

      <FormFile
        name={"images"}
        label={"Images"}
        multiple={true}
        errorMsg={formState.errors.images?.join(",")}
      ></FormFile>

      <p className="text-xs text-red-800 text-center">
        {formState.errors._form?.join(", ")}
      </p>
      <div className="w-full flex justify-end">
        <FormSubmit></FormSubmit>
      </div>
    </form>
  );
};

export default AddMerchForm;
