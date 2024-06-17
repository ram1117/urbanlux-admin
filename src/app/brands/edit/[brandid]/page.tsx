import DataNotFound from "@/atoms/DataNotFound";
import EditBrandForm from "@/components/brands/edit/EditBrandForm";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getBrand } from "@/lib/apiurls";

const Page = async ({ params }: { params: { brandid: string } }) => {
  const id = params.brandid;
  const response = await makeApiRequest(API_METHODS.GET, getBrand(id));
  if (!response?.ok) return <DataNotFound></DataNotFound>;

  const data = await response.json();

  return (
    <main className="min-h-screen">
      <h1 className="text-2xl font-bold py-4 text-center">Edit Brand</h1>
      <EditBrandForm item={data}></EditBrandForm>
    </main>
  );
};

export default Page;
