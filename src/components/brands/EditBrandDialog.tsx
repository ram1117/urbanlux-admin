"use client";

import { IBrand } from "@/interfaces";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import EditBrandForm from "./EditBrandForm";

interface EditBrandDialogProps {
  brand: IBrand;
}

const EditBrandDialog = ({ brand }: EditBrandDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="my-6">
        <Button>Edit Brand</Button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-[90vh] w-11/12 max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Edit Brand</DialogTitle>
        </DialogHeader>
        <EditBrandForm item={brand} setOpen={setOpen}></EditBrandForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditBrandDialog;
