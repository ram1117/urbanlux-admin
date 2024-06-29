import DataNotFound from "@/atoms/DataNotFound";
import ConfirmOrderForm from "@/components/orders/orderpage/ConfirmOrderForm";
import OrderSection from "@/atoms/OrderSection";

import { IOrder } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getOrderDetail } from "@/lib/apiurls";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";

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
      <ConfirmOrderForm orderid={orderData._id}></ConfirmOrderForm>
    </OrderSection>
  );
};

export default Page;
