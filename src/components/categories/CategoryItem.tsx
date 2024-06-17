import ImageWrapper from "@/atoms/ImageWrapper";
import { ICategory } from "@/interfaces";
import Link from "next/link";
import { Button } from "../ui/button";

interface CategoryItemProps {
  item: ICategory;
}

const CategoryItem = ({ item }: CategoryItemProps) => {
  return (
    <li className="flex flex-col gap-4">
      <ImageWrapper
        src={item.thumbnail}
        alt={"Category image"}
        imageSize={"w-full aspect-square"}
        sizes="(max-width:768px) 100vw,35vw"
      ></ImageWrapper>
      <p className="text-lg">{item.name}</p>
      <div className="w-full grid grid-cols-2 gap-2">
        <Button variant={"outline"}>
          <Link href={`/categories/view/${item._id}`}>View</Link>
        </Button>
        <Button>
          <Link href={`/categories/edit/${item._id}`}>Edit</Link>
        </Button>
      </div>
    </li>
  );
};

export default CategoryItem;
