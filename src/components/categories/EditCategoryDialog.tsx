"use client";

import { ICategory } from "@/interfaces";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import EditCategoryForm from "./EditCategoryForm";
import { useState } from "react";

interface EditCategoryDialogProps {
  category: ICategory;
}

const EditCategoryDialog = ({ category }: EditCategoryDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="">
        <Button>Edit Category</Button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-[90vh] w-11/12 max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <EditCategoryForm item={category} setOpen={setOpen}></EditCategoryForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryDialog;
