"use client";
import { IMerchandise } from "@/interfaces";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import EditMerchForm from "./EditMerchForm";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getClientBrands, getClientCategories } from "@/lib/apiurls";
import { useEffect, useState } from "react";

interface EditMerchDialogProps {
  merchandise: IMerchandise;
}
const EditMerchDialog = ({ merchandise }: EditMerchDialogProps) => {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [apiError, setApiError] = useState<string[]>([]);

  useEffect(() => {
    makeApiRequest(API_METHODS.GET, getClientBrands())
      .then((response) => response?.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((error: Error) => setApiError((prev) => [...prev, error.message]));

    makeApiRequest(API_METHODS.GET, getClientCategories())
      .then((response) => response?.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error: Error) => setApiError((prev) => [...prev, error.message]));
  }, []);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild className="">
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-[90vh] w-11/12 max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Edit Merchandise Details</DialogTitle>
          {apiError.length > 0 && (
            <p className="text-xs text-red-800">{apiError.join(",")}</p>
          )}
        </DialogHeader>
        <EditMerchForm
          merchandise={merchandise}
          brands={brands}
          categories={categories}
          setOpen={setOpen}
        ></EditMerchForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditMerchDialog;
