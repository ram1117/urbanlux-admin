"use server";

import { IOrder, IOrderFilterFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
const validationSchema = z.object({
  order_id: z.string().optional(),
  user_name: z.string().optional(),
  user_email: z.string().optional(),
  order_date: z.string().optional(),
});

const FilterOrdersAction = async (
  url: string,
  formState: IOrderFilterFormState,
  formData: FormData,
): Promise<IOrderFilterFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validation.success)
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      data: [],
    };
  let orderData: IOrder[] = [];
  try {
    const { currentUser } = await getAuthenticatedAppForUser();
    const response = await makeApiRequest(
      API_METHODS.POST,
      url,
      validation.data,
      await currentUser?.getIdToken(),
    );

    if (!response?.ok) {
      const error = await response?.json();
      if (error instanceof Error)
        return {
          success: false,
          errors: { _form: [error.message] },
          data: [],
        };
    }
    orderData = await response?.json();
  } catch (error) {
    if (error instanceof Error)
      return {
        success: false,
        errors: { _form: [error.message] },
        data: [],
      };
    return {
      success: false,
      errors: { _form: ["something went wrong"] },
      data: [],
    };
  }
  revalidatePath("/");
  return { success: true, errors: {}, data: orderData };
};

export default FilterOrdersAction;
