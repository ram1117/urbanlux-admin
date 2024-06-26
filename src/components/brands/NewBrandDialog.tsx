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
import NewBrandForm from "./NewBrandForm";

const NewBrandDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="">
        <Button>New Brand</Button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-[90vh] w-11/12 max-w-[900px]">
        <DialogHeader>
          <DialogTitle>New Brand</DialogTitle>
        </DialogHeader>
        <NewBrandForm setOpen={setOpen}></NewBrandForm>
      </DialogContent>
    </Dialog>
  );
};

export default NewBrandDialog;
