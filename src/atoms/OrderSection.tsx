import OrderItemsTable from "@/components/orders/orderpage/OrderItemsTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { IOrder } from "@/interfaces";

interface OrderSectionProps {
  orderData: IOrder;
  children: React.ReactNode;
}

const OrderSection = ({ orderData, children }: OrderSectionProps) => {
  return (
    <main className="min-h-screen max-w-[1440px] mx-auto my-6 lg:my-12">
      <section className="w-11/12 lg:w-5/6 mx-auto my-4"></section>
      <Card className="my-4">
        <CardHeader className="flex-col lg:flex-row justify-between gap-4">
          <div>
            <CardTitle>Order - {orderData._id}</CardTitle>
            <CardDescription>Details about the order</CardDescription>
          </div>
          <div className="lg:text-center capitalize">
            <p className="underline text-sm">Payment Status</p>
            <p className="text-lg">{orderData.payment_status}</p>
          </div>
          <div className="lg:text-center capitalize">
            <p className="underline text-sm">Order Status</p>
            <p className="text-lg">{orderData.order_status}</p>
          </div>
          <div className="lg:text-center capitalize">
            <p className="underline text-sm">Total</p>
            <p className="text-lg">$ {orderData.total}</p>
          </div>
          {children}
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
          <CardDescription>Items in the order</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderItemsTable items={orderData.items}></OrderItemsTable>
        </CardContent>
      </Card>
      <div className=" my-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ps-4">
              {orderData.comments?.map((comment) => (
                <li key={comment}>{comment}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer info</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid grid-cols-2">
                <p>Name</p>
                <p>{orderData.user.firstname}</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Email</p>
                <p>{orderData.user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{orderData.address.line1}</p>
            <p>{orderData.address.line2}</p>
            <p>
              {orderData.address.city}, {orderData.address.state}
            </p>
            <p>{orderData.address.country}</p>
            <p>{orderData.address.postal_code}</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default OrderSection;
