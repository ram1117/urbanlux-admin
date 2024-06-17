import CategoryItem from "@/components/categories/CategoryItem";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getCategories } from "@/lib/apiurls";
import Link from "next/link";

const Page = async () => {
  const response = await makeApiRequest(API_METHODS.GET, getCategories());
  if (!response?.ok) {
    console.log(await response?.json());
    return <h2 className="text-lg text-center">Unable to fetch data</h2>;
  }

  const data = await response.json();

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="w-full py-4 border-b-2 flex justify-end">
        <Button>
          <Link href={"/categories/new"}>New Category</Link>
        </Button>
      </div>
      <ul className="grid grid-cols-2 lg:grid-cols-6 w-full gap-8 my-4">
        {data.map((item: ICategory) => (
          <CategoryItem item={item} key={item._id}></CategoryItem>
        ))}
      </ul>
    </main>
  );
};

export default Page;
