import { IOrderItem } from "@/interfaces";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "../../ui/table";
import ImageWrapper from "@/atoms/ImageWrapper";

interface OrderItemsTableProps {
  items: IOrderItem[];
}

const OrderItemsTable = ({ items }: OrderItemsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Subtotal</TableHead>
          <TableHead>Available</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow
            key={item._id}
            className={`capitalize ${item.available ? "opacity-100" : "opacity-40"}`}
          >
            <TableCell>
              <ImageWrapper
                src={item.merchandise_thumbnail}
                alt={"item thumbnail"}
                imageSize={"w-10 lg:w-20 aspect-square"}
              ></ImageWrapper>
            </TableCell>
            <TableCell>{item.merchandise_name}</TableCell>
            <TableCell>{item.size}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.subtotal}</TableCell>
            <TableCell>{item.available ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderItemsTable;
