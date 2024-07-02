import FormSubmit from "@/atoms/FormSubmit";
import { Input } from "../ui/input";
import { IOrder, IOrderFilterFormState } from "@/interfaces";
import { useFormState } from "react-dom";
import FilterOrdersAction from "@/app/actions/orders/filterorders.action";
import { useEffect } from "react";

interface OrderFilterFormProps {
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
  url: string;
}

const initialState: IOrderFilterFormState = {
  success: false,
  errors: {},
  data: [],
};

const OrderFilterForm = ({ setOrders, url }: OrderFilterFormProps) => {
  const bindedAction = FilterOrdersAction.bind(null, url);
  const [formState, formAction] = useFormState(bindedAction, initialState);

  useEffect(() => {
    if (formState.success) {
      setOrders(formState.data);
    }
  }, [formState.success, formState.data, setOrders]);

  return (
    <>
      <form className="flex gap-4 flex-wrap items-center" action={formAction}>
        <div>
          <Input type="text" name="order_id" placeholder="Order Id"></Input>
          <p className="text-xs text-red-800">
            {formState.errors.order_id?.join(",")}
          </p>
        </div>

        <div>
          <Input
            type="text"
            name="user_name"
            placeholder="Customer First Name"
          ></Input>
          <p className="text-xs text-red-800">
            {formState.errors.user_name?.join(",")}
          </p>
        </div>
        <div>
          <Input
            type="text"
            name="user_email"
            placeholder="Customer Email"
          ></Input>
          <p className="text-xs text-red-800">
            {formState.errors.user_email?.join(",")}
          </p>
        </div>

        <div>
          <Input type="date" name="order_date"></Input>
          <p className="text-xs text-red-800">
            {formState.errors.order_date?.join(",")}
          </p>
        </div>

        <FormSubmit text="Filter"></FormSubmit>
      </form>
      <p className="text-xs text-red-800">
        {formState.errors._form?.join(",")}
      </p>
    </>
  );
};

export default OrderFilterForm;
