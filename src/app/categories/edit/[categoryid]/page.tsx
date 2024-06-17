import DataNotFound from "@/atoms/DataNotFound";
import EditCategoryForm from "@/components/categories/Edit/EditCategoryForm";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getCategory } from "@/lib/apiurls";

const Page = async ({ params }: { params: { categoryid: string } }) => {
  const id = params.categoryid;
  const response = await makeApiRequest(API_METHODS.GET, getCategory(id));
  if (!response?.ok) return <DataNotFound></DataNotFound>;

  const data = await response.json();

  return (
    <main className="min-h-screen">
      <h1 className="text-2xl font-bold py-4 text-center">Edit Category</h1>
      <EditCategoryForm item={data}></EditCategoryForm>
    </main>
  );
};

export default Page;
