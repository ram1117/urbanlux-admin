import { IOrder } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/usersession.hooks";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import OrdersTable from "./OrdersTable";
import IconRefresh from "@public/iconrefresh.svg";
import ImageWrapper from "@/atoms/ImageWrapper";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import OrderFilterAccordion from "./OrderFilterAccordion";

interface OrdersProps {
  url: string;
  pathname?: string;
}

const Orders = ({ url, pathname = "/orders" }: OrdersProps) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const token = useCurrentUser();

  const fetchData = useCallback(
    async (token: string) => {
      const response = await makeApiRequest(API_METHODS.GET, url, {}, token);
      if (!response?.ok) {
        const error = await response?.json();
        setError(error.message);
      }
      const data = await response?.json();
      setOrders(data);
      setLoading(false);
    },
    [url],
  );

  useEffect(() => {
    if (token) fetchData(token);
  }, [token, fetchData]);

  const handleRefresh = () => {
    if (token) {
      setLoading(true);
      fetchData(token);
    }
  };

  return (
    <div>
      {error && <p className="text-sm text-red-800">{error}</p>}
      <Button
        variant={"ghost"}
        className="absolute right-0 top-4"
        onClick={handleRefresh}
      >
        <ImageWrapper
          src={IconRefresh}
          alt={"refresh icon"}
          imageSize={"h-8 w-8"}
        ></ImageWrapper>
      </Button>
      <OrderFilterAccordion
        setOrders={setOrders}
        url={url}
      ></OrderFilterAccordion>
      {loading && (
        <div className="flex flex-col gap-4 my-6 w-full">
          <Skeleton className="w-full h-4"></Skeleton>
          <Skeleton className="w-full h-4"></Skeleton>
          <Skeleton className="w-full h-4"></Skeleton>
        </div>
      )}
      {!loading && (
        <OrdersTable pathname={pathname} orders={orders}></OrdersTable>
      )}
    </div>
  );
};

export default Orders;
