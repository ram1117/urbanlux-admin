"use server";

import { IGenericFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { deleteImage } from "@/lib/apiurls";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DeleteImageAction = async (
  id: string,
  image: string,
): Promise<IGenericFormState> => {
  try {
    const { currentUser } = await getAuthenticatedAppForUser();
    const response = await makeApiRequest(
      API_METHODS.PATCH,
      deleteImage(id),
      {
        image,
      },
      await currentUser?.getIdToken(),
    );

    if (!response?.ok) {
      const error = await response?.json();
      return { success: false, errors: { _form: [error.message] } };
    }
  } catch (error) {
    if (error instanceof Error)
      return { success: false, errors: { _form: [error.message] } };
  }
  revalidatePath(`/merchandise/${id}`);
  redirect(`/merchandise/${id}`);
};

export default DeleteImageAction;