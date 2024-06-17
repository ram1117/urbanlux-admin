import ImageWrapper from "@/atoms/ImageWrapper";
import { ICategory } from "@/interfaces";
import Link from "next/link";
import { Button } from "../ui/button";

interface CategoryItemProps {
  item: ICategory;
}

const CategoryItem = ({ item }: CategoryItemProps) => {
  return (
    <li>
      <ImageWrapper
        src={item.thumbnail}
        alt={"Category image"}
        imageSize={"w-full aspect-square"}
        sizes="(max-width:768px) 100vw,35vw"
      ></ImageWrapper>
      <p className="text-lg">{item.name}</p>
      <Button>
        <Link href={`/categories/edit/${item._id}`}>Edit</Link>
      </Button>
    </li>
  );
};

export default CategoryItem;
