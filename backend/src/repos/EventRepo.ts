import Event, { IEvent } from "@src/models/Event";

export default {
  async add(event: IEvent) {
    return await event.save();
  },
  async update(id: string, event: Partial<IEvent>) {
    return await Event.findByIdAndUpdate(id, event, { new: true });
  },
  async delete(id: string) {
    return await Event.findByIdAndDelete(id);
  },
  async findByDateRange(startDate?: Date, endDate?: Date) {
    const query: any = {};
    if (startDate) query.createdAt = { $gte: startDate };
    if (endDate) {
      if (!query.createdAt) query.createdAt = {};
      query.createdAt.$lte = endDate;
    }
    return await Event.find(query);
  },
  async exists(id: string): Promise<boolean> {
    const event = await Event.findById(id);
    return event !== null;
  },
};
