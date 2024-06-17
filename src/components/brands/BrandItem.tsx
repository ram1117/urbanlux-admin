import ImageWrapper from "@/atoms/ImageWrapper";
import { IBrand } from "@/interfaces";
import { Button } from "../ui/button";
import Link from "next/link";

interface BrandItemProps {
  item: IBrand;
}

const BrandItem = ({ item }: BrandItemProps) => {
  return (
    <li className="flex flex-col gap-4">
      <ImageWrapper
        src={item.logo}
        alt={"brand logo"}
        imageSize={"w-full aspect-square"}
        sizes="(max-width:768px) 100vw,35vw"
      ></ImageWrapper>
      <p className="text-lg">{item.name}</p>
      <div className="w-full grid grid-cols-2 gap-2">
        <Button variant={"outline"}>
          <Link href={`/brands/view/${item._id}`}>View</Link>
        </Button>
        <Button>
          <Link href={`/brands/edit/${item._id}`}>Edit</Link>
        </Button>
      </div>
    </li>
  );
};

export default BrandItem;
