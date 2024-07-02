import DataNotFound from "@/atoms/DataNotFound";
import OrderSection from "@/atoms/OrderSection";
import { IOrder, ORDER_STATUS } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getOrderDetail } from "@/lib/apiurls";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import DispatchDialog from "@/components/orders/orderpage/DispatchDialog";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { orderid: string } }) => {
  const { currentUser } = await getAuthenticatedAppForUser();
  const response = await makeApiRequest(
    API_METHODS.GET,
    getOrderDetail(params.orderid),
    {},
    await currentUser?.getIdToken(),
  );

  if (!response?.ok) return <DataNotFound></DataNotFound>;
  const orderData: IOrder = await response.json();

  if (orderData.order_status === ORDER_STATUS.DISPATCHED) redirect("/");

  return (
    <OrderSection orderData={orderData}>
      <DispatchDialog
        orderid={orderData._id}
        orderitems={orderData.items}
        orderstatus={orderData.order_status}
      ></DispatchDialog>
    </OrderSection>
  );
};

export default Page;
