import BrandItem from "@/components/brands/BrandItem";
import { Button } from "@/components/ui/button";
import { IBrand } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getBrands } from "@/lib/apiurls";
import Link from "next/link";

const Page = async () => {
  const response = await makeApiRequest(API_METHODS.GET, getBrands());
  if (!response?.ok) {
    return <h2 className="text-lg text-center">Unable to fetch data</h2>;
  }

  const data = await response.json();

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="w-full py-4 border-b-2 flex justify-end">
        <Button>
          <Link href={"/brands/new"}>New Brand</Link>
        </Button>
      </div>
      <ul className="grid grid-cols-2 lg:grid-cols-6 w-full gap-8 my-4">
        {data.map((item: IBrand) => (
          <BrandItem item={item} key={item._id}></BrandItem>
        ))}
      </ul>
    </main>
  );
};

export default Page;
