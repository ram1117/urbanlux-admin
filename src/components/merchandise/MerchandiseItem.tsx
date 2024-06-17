import ImageWrapper from "@/atoms/ImageWrapper";
import { IMerchandise } from "@/interfaces";
import { Button } from "../ui/button";
import Link from "next/link";

interface MerchandiseItemProps {
  item: IMerchandise;
}

const MerchandiseItem = ({ item }: MerchandiseItemProps) => {
  return (
    <li className="flex flex-col gap-4 border">
      <ImageWrapper
        src={item.thumbnail}
        alt={"merchandise image"}
        imageSize={"w-full aspect-square"}
        sizes="(max-width:768px) 100vw,35vw"
      ></ImageWrapper>
      <p className="text-base text-nowrap text-ellipsis overflow-hidden">
        {item.name}
      </p>
      <div className="w-full grid grid-cols-2 gap-2">
        <Button variant={"outline"}>
          <Link href={`/merchandise/${item._id}`}>View</Link>
        </Button>
        <Button>
          <Link href={`/merchandise/edit/${item._id}`}>Edit</Link>
        </Button>
      </div>
    </li>
  );
};

export default MerchandiseItem;
