"use client";

import ConfirmOrderAction from "@/app/actions/orders/confirmorder.action";
import FormSubmit from "@/atoms/FormSubmit";
import { IConfirmOrderFormState } from "@/interfaces";
import { useFormState } from "react-dom";

interface ConfirmOrderFormProps {
  orderid: string;
}

const initialState: IConfirmOrderFormState = {
  success: false,
  errors: {},
};

const ConfirmOrderForm = ({ orderid }: ConfirmOrderFormProps) => {
  const bindedAction = ConfirmOrderAction.bind(null, orderid);
  const [formState, formAction] = useFormState(bindedAction, initialState);
  return (
    <div className="flex gap-2 items-center">
      <form action={formAction}>
        <FormSubmit text="Confirm Order"></FormSubmit>
        <p className="text-sm text-red-800">
          {formState.errors._form?.join(",")}
        </p>
      </form>
    </div>
  );
};

export default ConfirmOrderForm;