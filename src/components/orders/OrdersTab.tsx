"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Orders from "./Orders";
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
          <TabsTrigger value={ORDER_STATUS.DISPATCHED} className="py-3">
            Fulfilled Orders
          </TabsTrigger>
          <TabsTrigger value={"All"} className="py-3">
            All Orders
          </TabsTrigger>
        </TabsList>
        <TabsContent value={ORDER_STATUS.PLACED}>
          <Orders
            pathname={`/placed`}
            url={getOrdersClient(ORDER_STATUS.PLACED)}
          ></Orders>
        </TabsContent>
        <TabsContent value={ORDER_STATUS.CONFIRMED}>
          <Orders
            pathname="/confirmed"
            url={getOrdersClient(ORDER_STATUS.CONFIRMED)}
          ></Orders>
        </TabsContent>
        <TabsContent value={ORDER_STATUS.DISPATCHED}>
          <Orders url={getOrdersClient(ORDER_STATUS.DISPATCHED)}></Orders>
        </TabsContent>
        <TabsContent value={"All"}>
          <Orders url={getOrdersClient("all")}></Orders>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default OrdersTab;
