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
import AddSizeForm from "./AddSizeForm";

interface AddSizeDialogProps {
  id: string;
}

const AddSizeDialog = ({ id }: AddSizeDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Size</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Size</DialogTitle>
        </DialogHeader>
        <AddSizeForm id={id} setOpen={setOpen}></AddSizeForm>
      </DialogContent>
    </Dialog>
  );
};

export default AddSizeDialog;
