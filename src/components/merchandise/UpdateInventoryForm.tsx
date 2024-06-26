"use client";

import FormSubmit from "@/atoms/FormSubmit";
import { IInventory, IUpdateInventoryFormState } from "@/interfaces";
import { TableCell } from "@/components/ui/table";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import UpdateInventoryAction from "@/app/actions/updateinventory.action";
import { useFormState } from "react-dom";

interface UpdateInventoryFormProps {
  item: IInventory;
  merchandiseId: string;
}

const initialState: IUpdateInventoryFormState = { success: false, errors: {} };

const UpdateInventoryForm = ({
  item,
  merchandiseId,
}: UpdateInventoryFormProps) => {
  const bindedAction = UpdateInventoryAction.bind(
    null,
    item._id,
    merchandiseId,
  );
  const [formState, formAction] = useFormState(bindedAction, initialState);

  return (
    <TableCell>
      <form
        className="grid grid-cols-2 lg:grid-cols-4 gap-2 items-end my-4"
        action={formAction}
      >
        <div className="">
          <p className="text-xs">Size</p>
          <h3 className="text-lg font-semibold underline">{item.size}</h3>
        </div>
        <div className="">
          <Label htmlFor="stock" className="text-xs">
            Stock +/-
          </Label>
          <Input name="stock" id="stock" type="number" defaultValue={0}></Input>
          <p className="text-xs text-red-800">
            {formState.errors.stock?.join(",")}
          </p>
        </div>
        <div className="">
          <Label htmlFor="price" className="text-xs">
            Price
          </Label>
          <Input
            name="price"
            id="price"
            type="number"
            min={0}
            defaultValue={item.price}
          ></Input>
          <p className="text-xs text-red-800">
            {formState.errors.price?.join(",")}
          </p>
        </div>
        <div>
          <FormSubmit text="Update"></FormSubmit>
          <p className="text-xs text-red-800">
            {formState.errors._form?.join(",")}
          </p>
          {formState.success && (
            <p className="text-xs text-green-800">Updated!</p>
          )}
        </div>
      </form>
    </TableCell>
  );
};

export default UpdateInventoryForm;
