"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import NewCategoryForm from "./NewCategoryForm";
const NewCategoryDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="my-6">
        <Button>New Category</Button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-[90vh] w-11/12 max-w-[900px]">
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
        </DialogHeader>
        <NewCategoryForm setOpen={setOpen}></NewCategoryForm>
      </DialogContent>
    </Dialog>
  );
};

export default NewCategoryDialog;
