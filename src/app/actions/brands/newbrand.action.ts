"use server";

import { INewBrandFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { createBrand } from "@/lib/apiurls";
import uploadImage from "@/lib/azure/azure.upload";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const validationSchema = z.object({
  logo: z
    .any()
    .refine((file) => file !== null, "Image required")
    .refine(
      (file) => IMAGE_TYPES.includes(file?.type),
      "Invalid file. choose PNG/JPG/JPEG image",
    ),
  name: z.string().min(3),
  description: z.string().min(10),
  brand_code: z.string().min(3),
  create_store: z.string().min(2, { message: "Required" }),
});

const NewBrandAction = async (
  formState: INewBrandFormState,
  formData: FormData,
): Promise<INewBrandFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logo, ...restData } = validation.data;
    let bodyData: object = {};

    const imageUrl = await uploadImage(validation.data.logo, "brands");
    if (imageUrl) {
      bodyData = {
        ...restData,
        logo: imageUrl,
        create_store: restData.create_store === "yes",
        brand_code: `brand_${restData.brand_code}`,
      };
    }

    const { currentUser } = await getAuthenticatedAppForUser();
    const response = await makeApiRequest(
      API_METHODS.POST,
      createBrand(),
      bodyData,
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

  revalidatePath(`/brands`);
  return { success: true, errors: {} };
};

export default NewBrandAction;
