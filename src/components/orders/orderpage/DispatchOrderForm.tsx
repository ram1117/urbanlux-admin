import DispatchOrderAction from "@/app/actions/orders/dispatchorder.action";
import { FormInput } from "@/atoms";
import FormSubmit from "@/atoms/FormSubmit";
import { Checkbox } from "@/components/ui/checkbox";
import {
  IDispatchOrderFormState,
  IOrderItem,
  ORDER_STATUS,
} from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

interface DispatchOrderFormProps {
  orderid: string;
  orderitems: IOrderItem[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orderstatus: string;
}

const initialState: IDispatchOrderFormState = { success: false, errors: {} };

const DispatchOrderForm = ({
  orderid,
  orderitems,
  setOpen,
  orderstatus,
}: DispatchOrderFormProps) => {
  const router = useRouter();
  const bindedAction = DispatchOrderAction.bind(null, orderid);
  const [formState, formAction] = useFormState(bindedAction, initialState);

  useEffect(() => {
    if (formState.success) {
      setOpen(false);
      router.push("/");
    }
  }, [formState.success, setOpen, router]);

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <div>
        <h3 className="text-lg font-semibold">Check List</h3>
        <ul>
          {orderitems.map((item) => {
            if (item.available)
              return (
                <li
                  className="capitalize sm:items-center flex-col md:flex-row flex flex-wrap gap-4 justify-between py-2 border-y-2"
                  key={item._id}
                >
                  <div>
                    <p className="underline">Name</p>
                    <p className="">{item.merchandise_name}</p>
                  </div>
                  <div>
                    <p className="underline">Quantity</p>
                    <p>{item.quantity}</p>
                  </div>
                  <div>
                    <p className="underline">Size</p>
                    <p className="">{item.size}</p>
                  </div>

                  <Checkbox required></Checkbox>
                </li>
              );
          })}
        </ul>
      </div>
      <FormInput
        label={"Tracking Id"}
        type={"text"}
        name={"tracking_id"}
        errormsg={formState.errors.tracking_id?.join(",")}
      ></FormInput>
      <p className="text-sm text-red-800">
        {formState.errors._form?.join(",")}
      </p>
      <FormSubmit
        className="w-max"
        text="Dispatch"
        disabled={orderstatus === ORDER_STATUS.DISPATCHED}
      ></FormSubmit>
    </form>
  );
};

export default DispatchOrderForm;
