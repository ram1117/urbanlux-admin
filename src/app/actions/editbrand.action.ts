"use server";

import { INewBrandFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { updateBrand } from "@/lib/apiurls";
import uploadImage from "@/lib/azure/azure.upload";
import { redirect } from "next/navigation";
import { z } from "zod";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const validationSchema = z.object({
  logo: z
    .any()
    .refine(
      (file) =>
        file.length > 0
          ? IMAGE_TYPES.includes(file?.[0]?.type)
            ? true
            : false
          : true,
      "Invalid file. choose PNG/JPG/JPEG image",
    ),
  name: z.string().min(3),
  description: z.string().min(10),
  brand_code: z.string().min(3),
  create_store: z.string().min(2, { message: "Required" }),
});

const EditBrandAction = async (
  id: string,
  formState: INewBrandFormState,
  formData: FormData,
): Promise<INewBrandFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }
  try {
    const { logo, ...restData } = validation.data;
    let bodyData: object = {
      ...restData,
      create_store: validation.data.create_store === "yes",
    };
    if (logo.size > 0) {
      const imageUrl = await uploadImage(validation.data.logo, "brands");
      if (imageUrl) {
        bodyData = { ...restData, logo: imageUrl };
      }
    }

    const response = await makeApiRequest(
      API_METHODS.PATCH,
      updateBrand(id),
      bodyData,
    );

    if (!response?.ok) {
      const error = await response?.json();
      return { errors: { _form: [error.message] } };
    }
  } catch (error) {
    if (error instanceof Error) return { errors: { _form: [error.message] } };
    return { errors: { _form: ["Something went wrong"] } };
  }

  redirect(`/brands/view/${id}`);
};

export default EditBrandAction;
