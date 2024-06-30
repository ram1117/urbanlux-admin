"use server";

import { IConfirmOrderFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { confirmOrder } from "@/lib/apiurls";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ConfirmOrderAction = async (
  orderid: string,
): Promise<IConfirmOrderFormState> => {
  try {
    const { currentUser } = await getAuthenticatedAppForUser();
    const response = await makeApiRequest(
      API_METHODS.PATCH,
      confirmOrder(orderid),
      {},
      await currentUser?.getIdToken(),
    );
    if (!response?.ok) {
      const error = await response?.json();
      return { success: false, errors: { _form: [error.message] } };
    }
  } catch (error) {
    if (error instanceof Error)
      return { success: false, errors: { _form: [error.message] } };
    return { success: false, errors: { _form: ["something went wrong"] } };
  }
  revalidatePath(`/orders/${orderid}`);
  redirect("/");
};

export default ConfirmOrderAction;
