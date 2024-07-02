"use server";

import { IAddImageFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { addImage } from "@/lib/apiurls";
import uploadImage from "@/lib/azure/azure.upload";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const validationSchema = z.object({
  image: z
    .any()
    .refine((file) => file !== null, "Image required")
    .refine(
      (file) => IMAGE_TYPES.includes(file?.type),
      "Invalid file. choose PNG/JPG/JPEG image",
    ),

  thumbnail: z.string().min(2, { message: "Required" }),
});

const AddImageAction = async (
  id: string,
  name: string,
  formState: IAddImageFormState,
  formData: FormData,
): Promise<IAddImageFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  try {
    let bodyData: object = {};

    const imageUrl = await uploadImage(
      validation.data.image,
      `merchandise/${name}`,
    );

    if (imageUrl) {
      bodyData = {
        image: imageUrl,
      };
      if (validation.data.thumbnail === "yes") {
        bodyData = { ...bodyData, thumbnail: imageUrl };
      }
      const { currentUser } = await getAuthenticatedAppForUser();
      const response = await makeApiRequest(
        API_METHODS.PATCH,
        addImage(id),
        bodyData,
        await currentUser?.getIdToken(),
      );
      if (!response?.ok) {
        const error = await response?.json();
        return { errors: { _form: [error.message] } };
      }
    }
  } catch (error) {
    if (error instanceof Error) return { errors: { _form: [error.message] } };
    return { errors: { _form: ["Something went wrong"] } };
  }

  revalidatePath(`/merchandise/${id}`);
  return { success: true, errors: {} };
};

export default AddImageAction;
