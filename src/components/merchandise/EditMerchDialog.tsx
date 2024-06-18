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
import DataNotFound from "@/atoms/DataNotFound";
import { getBrands, getCategories } from "@/lib/apiurls";

interface EditMerchDialogProps {
  merchandise: IMerchandise;
}
const EditMerchDialog = async ({ merchandise }: EditMerchDialogProps) => {
  const brandResponse = await makeApiRequest(API_METHODS.GET, getBrands());
  if (!brandResponse?.ok) return <DataNotFound></DataNotFound>;
  const brandData = await brandResponse.json();

  const categoryResponse = await makeApiRequest(
    API_METHODS.GET,
    getCategories(),
  );
  if (!categoryResponse?.ok) return <DataNotFound></DataNotFound>;
  const categoryData = await categoryResponse.json();

  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-[90vh] w-11/12 max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Edit Merchandise Details</DialogTitle>
        </DialogHeader>
        <EditMerchForm
          merchandise={merchandise}
          brands={brandData}
          categories={categoryData}
        ></EditMerchForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditMerchDialog;
