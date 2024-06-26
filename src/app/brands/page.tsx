import DataNotFound from "@/atoms/DataNotFound";
import NoItemsFound from "@/atoms/NoItemsFound";
import BrandItem from "@/components/brands/BrandItem";
import NewBrandDialog from "@/components/brands/NewBrandDialog";
import { IBrand } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getBrands } from "@/lib/apiurls";

const Page = async () => {
  const response = await makeApiRequest(API_METHODS.GET, getBrands());
  if (!response?.ok) {
    return <DataNotFound></DataNotFound>;
  }
  const data = await response.json();
  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="w-full py-4 border-b-2 flex justify-end">
        <NewBrandDialog></NewBrandDialog>
      </div>
      {data.length === 0 && <NoItemsFound></NoItemsFound>}
      <ul className="grid grid-cols-2 lg:grid-cols-6 w-full gap-8 my-4">
        {data.map((item: IBrand) => (
          <BrandItem item={item} key={item._id}></BrandItem>
        ))}
      </ul>
    </main>
  );
};

export default Page;
