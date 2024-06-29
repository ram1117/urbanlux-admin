import DataNotFound from "@/atoms/DataNotFound";
import OrderSection from "@/atoms/OrderSection";
import { IOrder } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getOrderDetail } from "@/lib/apiurls";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import DispatchDialog from "@/components/orders/orderpage/DispatchDialog";

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

  return (
    <OrderSection orderData={orderData}>
      <DispatchDialog
        orderid={orderData._id}
        orderitems={orderData.items}
      ></DispatchDialog>
    </OrderSection>
  );
};

export default Page;
