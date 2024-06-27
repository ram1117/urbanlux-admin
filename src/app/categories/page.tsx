import DataNotFound from "@/atoms/DataNotFound";
import NoItemsFound from "@/atoms/NoItemsFound";
import CategoryItem from "@/components/categories/CategoryItem";
import NewCategoryDialog from "@/components/categories/NewCategoryDialog";
import { ICategory } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getCategories } from "@/lib/apiurls";
import {
  getAuthenticatedAppForUser,
  redirectToLogin,
} from "@/lib/firebase/firebase.server";

const Page = async () => {
  await redirectToLogin();
  const { currentUser } = await getAuthenticatedAppForUser();
  const response = await makeApiRequest(
    API_METHODS.GET,
    getCategories(),
    {},
    await currentUser?.getIdToken(),
  );
  if (!response?.ok) {
    return <DataNotFound></DataNotFound>;
  }

  const data = await response.json();

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="w-full py-4 border-b-2 flex justify-end">
        <NewCategoryDialog></NewCategoryDialog>
      </div>
      {data.length === 0 && <NoItemsFound></NoItemsFound>}
      <ul className="grid grid-cols-2 lg:grid-cols-6 w-full gap-8 my-4">
        {data.map((item: ICategory) => (
          <CategoryItem item={item} key={item._id}></CategoryItem>
        ))}
      </ul>
    </main>
  );
};

export default Page;
