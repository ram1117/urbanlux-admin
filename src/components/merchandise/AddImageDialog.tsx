import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import AddImageForm from "./AddImageForm";

interface AddImageDialogProps {
  id: string;
  name: string;
}

const AddImageDialog = ({ id, name }: AddImageDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Image</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a new image for product</DialogTitle>
        </DialogHeader>
        <AddImageForm id={id} name={name}></AddImageForm>
      </DialogContent>
    </Dialog>
  );
};

export default AddImageDialog;
