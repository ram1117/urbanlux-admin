"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderItems from "./OrderItems";
import { getOrdersClient } from "@/lib/apiurls";
import { ORDER_STATUS } from "@/interfaces";

const OrdersTab = () => {
  return (
    <section className="w-full relative">
      <Tabs
        defaultValue={ORDER_STATUS.PLACED}
        className="w-11/12 lg:w-4/5 mx-auto my-20 lg:my-4"
      >
        <TabsList className="h-max grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-6 gap-4 ">
          <TabsTrigger value={ORDER_STATUS.PLACED} className="py-3">
            New Orders
          </TabsTrigger>
          <TabsTrigger value={ORDER_STATUS.CONFIRMED} className="py-3">
            Confirmed Orders
          </TabsTrigger>
          <TabsTrigger value={ORDER_STATUS.FULFILLED} className="py-3">
            Fulfilled Orders
          </TabsTrigger>
          <TabsTrigger value={"All"} className="py-3">
            All Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value={ORDER_STATUS.PLACED}>
          <OrderItems url={getOrdersClient(ORDER_STATUS.PLACED)}></OrderItems>
        </TabsContent>
        <TabsContent value={ORDER_STATUS.CONFIRMED}>
          <OrderItems
            url={getOrdersClient(ORDER_STATUS.CONFIRMED)}
          ></OrderItems>
        </TabsContent>
        <TabsContent value={ORDER_STATUS.FULFILLED}>
          <OrderItems
            url={getOrdersClient(ORDER_STATUS.FULFILLED)}
          ></OrderItems>
        </TabsContent>
        <TabsContent value={"All"}>
          <OrderItems url={getOrdersClient("all")}></OrderItems>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default OrdersTab;
