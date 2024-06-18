"use client";

import { IAddMerchFormState, IBrand, ICategory } from "@/interfaces";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import FormSubmit from "@/atoms/FormSubmit";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import AddMerchAction from "@/app/actions/addmerch.action";
import { useFormState } from "react-dom";

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
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="name" className="w-full md:w-1/4">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            className="rounded-none w-full md:w-3/4"
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
          <Label htmlFor="features" className="w-full md:w-1/4">
            Features - separate lines with &ldquo;/&rdquo;
          </Label>
          <Textarea
            id="features"
            name="features"
            className="rounded-none w-full md:w-3/4"
            rows={7}
          ></Textarea>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.features?.join(", ")}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="brand" className="w-full md:w-1/4">
            Select Brand
          </Label>
          <Select name="brand">
            <SelectTrigger className="w-full md:w-3/4 rounded-none">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent id="brand">
              <SelectGroup>
                {brands.map((brand: IBrand) => (
                  <SelectItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.brand?.join(", ")}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="category" className="w-full md:w-1/4">
            Select Category
          </Label>
          <Select name="category">
            <SelectTrigger className="w-full md:w-3/4 rounded-none">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent id="category">
              <SelectGroup>
                {categories.map((category: ICategory) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.category?.join(", ")}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="sizes" className="w-full md:w-1/4">
            Sizes -&ldquo;,&rdquo; separated
          </Label>
          <Input
            id="sizes"
            name="sizes"
            type="text"
            className="rounded-none w-full md:w-3/4"
          ></Input>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.sizes?.join(", ")}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="thumbnail" className="w-full md:w-1/4">
            Thumbnail
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
          <Label htmlFor="images" className="w-full md:w-1/4">
            Images
          </Label>
          <Input
            id="images"
            name="images"
            type="file"
            accept=".jpg,.jpeg,.png"
            className="rounded-none  w-full md:w-3/4"
            multiple
          ></Input>
        </div>
        <p className="text-xs text-red-800 text-center">
          {formState.errors.images?.join(", ")}
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

export default AddMerchForm;
