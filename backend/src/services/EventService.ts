import HttpStatusCodes from "@src/common/HttpStatusCodes";
import RouteError from "@src/common/RouteError";
import Event, { IEvent } from "@src/models/Event";
import EventRepo from "@src/repos/EventRepo";

// **** Variables **** //

export const EVENT_NOT_FOUND_ERR = "Event not found";

// **** Functions **** //

/**
 * Get events.
 */
function getByDateRange(
  startDate?: string,
  endDate?: string
): Promise<IEvent[]> {
  return EventRepo.findByDateRange(
    startDate ? new Date(startDate) : undefined,
    endDate ? new Date(endDate) : undefined
  );
}

/**
 * Add one event.
 */
function addOne(event: IEvent): Promise<IEvent> {
  const eventDoc = new Event(event);
  return EventRepo.add(eventDoc);
}

/**
 * Update one event.
 */
async function updateOne(id: string, event: IEvent): Promise<IEvent | null> {
  const isExists = await EventRepo.exists(id);
  if (!isExists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, EVENT_NOT_FOUND_ERR);
  }
  // Return event
  return EventRepo.update(id, event);
}

/**
 * Delete an event by their id.
 */
async function deleteById(id: string): Promise<IEvent | null> {
  const isExists = await EventRepo.exists(id);
  if (!isExists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, EVENT_NOT_FOUND_ERR);
  }
  // Delete event
  return EventRepo.delete(id);
}

// **** Export default **** //

export default {
  getByDateRange,
  addOne,
  updateOne,
  deleteById,
} as const;
