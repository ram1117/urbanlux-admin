"use client";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IOrderItem } from "@/interfaces";
import { useState } from "react";
import DispatchOrderForm from "./DispatchOrderForm";
import { Button } from "@/components/ui/button";

interface DispatchDialogProps {
  orderid: string;
  orderitems: IOrderItem[];
  orderstatus: string;
}
const DispatchDialog = ({
  orderid,
  orderitems,
  orderstatus,
}: DispatchDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Dispatch</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dispatch Order</DialogTitle>
          <DialogDescription>Confirm order dispatch</DialogDescription>
        </DialogHeader>

        <DispatchOrderForm
          orderid={orderid}
          orderitems={orderitems}
          setOpen={setOpen}
          orderstatus={orderstatus}
        ></DispatchOrderForm>
      </DialogContent>
    </Dialog>
  );
};

export default DispatchDialog;
