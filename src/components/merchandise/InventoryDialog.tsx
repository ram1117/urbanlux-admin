import { IInventory } from "@/interfaces";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Table, TableBody, TableRow } from "@/components/ui/table";
import UpdateInventoryForm from "./UpdateInventoryForm";

interface InventoryDialogProps {
  items: IInventory[];
  merchandiseId: string;
}

const InventoryDialog = ({ items, merchandiseId }: InventoryDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="my-6">
        <Button>Update Inventory</Button>
      </DialogTrigger>
      <DialogContent className="overflow-scroll max-h-[90vh] w-11/12 max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Update Inventory Items</DialogTitle>
        </DialogHeader>
        <Table className="my-4 text-black">
          <TableBody>
            {items.map((item: IInventory) => (
              <TableRow key={item._id}>
                <UpdateInventoryForm
                  merchandiseId={merchandiseId}
                  item={item}
                ></UpdateInventoryForm>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryDialog;
