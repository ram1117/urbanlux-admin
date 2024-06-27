import DataNotFound from "@/atoms/DataNotFound";
import AddMerchForm from "@/components/merchandise/AddMerchForm";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getBrands, getCategories } from "@/lib/apiurls";
import {
  getAuthenticatedAppForUser,
  redirectToLogin,
} from "@/lib/firebase/firebase.server";

const Page = async () => {
  await redirectToLogin();
  const { currentUser } = await getAuthenticatedAppForUser();
  const brandResponse = await makeApiRequest(
    API_METHODS.GET,
    getBrands(),
    {},
    await currentUser?.getIdToken(),
  );
  if (!brandResponse?.ok) return <DataNotFound></DataNotFound>;
  const brandData = await brandResponse.json();

  const categoryResponse = await makeApiRequest(
    API_METHODS.GET,
    getCategories(),
  );
  if (!categoryResponse?.ok) return <DataNotFound></DataNotFound>;
  const categoryData = await categoryResponse.json();

  return (
    <main className="min-h-screen p-4">
      <h1 className="text-xl font-bold py-4 border-b text-center">
        Create New Merchandise
      </h1>
      <AddMerchForm brands={brandData} categories={categoryData}></AddMerchForm>
    </main>
  );
};

export default Page;
