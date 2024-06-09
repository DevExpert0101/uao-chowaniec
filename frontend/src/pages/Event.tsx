import { DatePickerWithRange } from "@/components/ui/DateRangePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Event } from "@/lib/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface AddEventDialogProps {
  handleSubmit: (description: string, price: number) => void;
}
const AddEventDialog: React.FC<AddEventDialogProps> = ({ handleSubmit }) => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(description, price);
    },
    [description, price, handleSubmit]
  );

  const handleOpenChange = useCallback(() => {
    setDescription("");
    setPrice(0);
  }, []);

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create new event</DialogTitle>
            <DialogDescription>
              Create a new event here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                placeholder="e.g. Event for new workflow"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                className="col-span-3"
                placeholder="e.g. 33"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface EditEventDialogProps {
  event: Event;
  handleSubmit: (description: string, price: number, id: string) => void;
}
const EditEventDialog: React.FC<EditEventDialogProps> = ({
  event,
  handleSubmit,
}) => {
  const [description, setDescription] = useState(event.description);
  const [price, setPrice] = useState(event.price);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(description, price, event.id);
    },
    [description, price, handleSubmit]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="w-[35px] h-[35px]">
          <Edit size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Update event</DialogTitle>
            <DialogDescription>
              Update the event here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                placeholder="e.g. Event for new workflow"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                className="col-span-3"
                placeholder="e.g. 33"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EventPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [date, setDate] = useState<DateRange | undefined>();

  const handleSubmit = useCallback(
    (description: string, price: number, id?: string) => {
      const url = id ? `/api/events/${id}` : "/api/events";
      fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: {
            description,
            price,
          },
        }),
      }).then(async (res) => {
        if (res.status === 201) {
          const newEvent = await res.json();
          setEvents((prvEvents) => [
            ...prvEvents,
            {
              ...newEvent,
              id: newEvent._id,
              createdAt: new Date(newEvent.createdAt),
            },
          ]);
        } else if (res.status === 200) {
          setEvents((prvEvents) =>
            prvEvents.map((ev) =>
              ev.id === id ? { ...ev, description, price } : ev
            )
          );
        }
      });
    },
    []
  );

  const handleDelete = useCallback(
    (id: string) => () => {
      fetch(`/api/events/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.status === 200) {
          setEvents((prvEvents) => prvEvents.filter((ev) => ev.id !== id));
        }
      });
    },
    []
  );

  useEffect(() => {
    const query = [
      date?.from ? `startDate=${date.from.toISOString()}` : "",
      date?.to ? `endDate=${date.to.toISOString()}` : "",
    ]
      .filter(Boolean)
      .join("&");

    fetch(`/api/events?${query}`)
      .then((res) => res.json())
      .then((data) =>
        setEvents(
          data.events.map(
            (ev: any) =>
              ({
                ...ev,
                id: ev._id,
                createdAt: new Date(ev.createdAt),
              } as Event)
          )
        )
      );
  }, [date]);

  return (
    <div className="container pt-10">
      <div className="flex justify-between items-center">
        <AddEventDialog handleSubmit={handleSubmit} />
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <div className="border mt-5">
        <Table>
          {events.length === 0 && (
            <TableCaption className="mb-5">
              No events. Add new event using above button.
            </TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#ID</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead className="w-[150px]">Created At</TableHead>
              <TableHead className="w-[150px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.id}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.price}</TableCell>
                <TableCell>{format(event.createdAt, "LLL dd, y")}</TableCell>
                <TableCell className="text-right">
                  <EditEventDialog event={event} handleSubmit={handleSubmit} />
                  <Button
                    size="icon"
                    className="w-[35px] h-[35px] ml-3"
                    onClick={handleDelete(event.id)}
                  >
                    <Trash size={15} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EventPage;
