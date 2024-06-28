import { IOrder } from "@/interfaces";
import {
  Table,
  TableHeader,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "../ui/table";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface OrdersTableProps {
  orders: IOrder[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  if (orders.length === 0) return <p className="italic">No Orders found</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order._id}>
            <TableCell>{formatDate(order.updatedAt)}</TableCell>
            <TableCell>
              <Link href={`/orders/${order._id}`} className="underline">
                {order._id}
              </Link>
            </TableCell>
            <TableCell>{order.order_status}</TableCell>
            <TableCell>{order.payment_status}</TableCell>
            <TableCell>{order.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
