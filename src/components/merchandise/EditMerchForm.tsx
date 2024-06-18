"use client";

import { IBrand, ICategory, IMerchandise } from "@/interfaces";
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

interface EditMerchFormProps {
  merchandise: IMerchandise;
  brands: IBrand[];
  categories: ICategory[];
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditMerchForm = ({
  merchandise,
  brands,
  categories,
}: EditMerchFormProps) => {
  return (
    <form className="my-12 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label htmlFor="name" className="w-full md:w-1/4">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={merchandise.name}
            className="rounded-none w-full md:w-3/4"
          ></Input>
        </div>
        <p className="text-xs text-red-800 text-center">
          {/* {formState.errors.name?.join(', ')} */}
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
            defaultValue={merchandise.description}
            rows={7}
          ></Textarea>
        </div>
        <p className="text-xs text-red-800 text-center">
          {/* {formState.errors.description?.join(', ')} */}
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
            defaultValue={merchandise.features.join("/")}
            rows={7}
          ></Textarea>
        </div>
        <p className="text-xs text-red-800 text-center">
          {/* {formState.errors.features?.join(', ')} */}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label className="w-full md:w-1/4">Select Brand</Label>
          <Select defaultValue={merchandise.brand._id} name="brand">
            <SelectTrigger className="w-full md:w-3/4 rounded-none">
              <SelectValue placeholder={"Select Brand"}></SelectValue>
            </SelectTrigger>
            <SelectContent>
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
          {/* {formState.errors.brand?.join(', ')} */}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <Label className="w-full md:w-1/4">Select Category</Label>
          <Select defaultValue={merchandise.category._id} name="category">
            <SelectTrigger className="w-full md:w-3/4 rounded-none">
              <SelectValue placeholder={"Select Category"}></SelectValue>
            </SelectTrigger>
            <SelectContent>
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
          {/* {formState.errors.brand?.join(', ')} */}
        </p>
      </div>

      <p className="text-xs text-red-800 text-center">
        {/* {formState.errors._form?.join(', ')} */}
      </p>
      <div className="w-full flex justify-end">
        <FormSubmit></FormSubmit>
      </div>
    </form>
  );
};

export default EditMerchForm;
