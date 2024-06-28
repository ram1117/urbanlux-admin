import { IOrder } from "@/interfaces";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "../ui/accordion";
import OrderFilterForm from "./OrderFilterForm";

interface OrderFilterAccordionProps {
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
  url: string;
}

const OrderFilterAccordion = ({
  setOrders,
  url,
}: OrderFilterAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full py-4">
      <AccordionItem value="filterform">
        <AccordionTrigger>Order Filter</AccordionTrigger>
        <AccordionContent className="p-2">
          <OrderFilterForm setOrders={setOrders} url={url}></OrderFilterForm>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default OrderFilterAccordion;
