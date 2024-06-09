import { IEvent } from "@src/models/Event";
import { IReq, IRes } from "./types/express/misc";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import EventService from "@src/services/EventService";

// **** Functions **** //

/**
 * Get events.
 */
async function get(req: IReq, res: IRes) {
  const startDate = req.query.startDate as string | undefined;
  const endDate = req.query.endDate as string | undefined;
  const events = await EventService.getByDateRange(startDate, endDate);
  return res.status(HttpStatusCodes.OK).json({ events });
}

/**
 * Add one event.
 */
async function add(req: IReq<{ event: IEvent }>, res: IRes) {
  const { event } = req.body;
  const newEvent = await EventService.addOne(event);
  return res.status(HttpStatusCodes.CREATED).json(newEvent);
}

/**
 * Update one event.
 */
async function update(req: IReq<{ event: IEvent }>, res: IRes) {
  const id = req.params.id;
  const { event } = req.body;
  await EventService.updateOne(id, event);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one event.
 */
async function delete_(req: IReq, res: IRes) {
  const id = req.params.id;
  await EventService.deleteById(id);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  get,
  add,
  update,
  delete: delete_,
} as const;
