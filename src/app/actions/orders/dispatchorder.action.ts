"use server";
import { IDispatchOrderFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { dispatchOrder } from "@/lib/apiurls";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const validationSchema = z.object({
  tracking_id: z.string().min(4, { message: "required" }),
});

const DispatchOrderAction = async (
  orderid: string,
  formState: IDispatchOrderFormState,
  formData: FormData,
): Promise<IDispatchOrderFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validation.success)
    return { success: false, errors: validation.error.flatten().fieldErrors };

  try {
    const { currentUser } = await getAuthenticatedAppForUser();
    const response = await makeApiRequest(
      API_METHODS.PATCH,
      dispatchOrder(orderid),
      validation.data,
      await currentUser?.getIdToken(),
    );
    if (!response?.ok) {
      const error = await response?.json();
      return { success: false, errors: { _form: [error.message] } };
    }
  } catch (error) {
    if (error instanceof Error)
      return { success: false, errors: { _form: [error.message] } };
    return { success: false, errors: { _form: ["Something went wrong"] } };
  }
  revalidatePath(`/orders/${orderid}`);
  return { success: true, errors: {} };
};

export default DispatchOrderAction;
