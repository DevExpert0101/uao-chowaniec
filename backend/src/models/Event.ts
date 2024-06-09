import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  description: string;
  price: number;
  createdAt: Date;
}

const EventSchema: Schema<IEvent> = new Schema({
  description: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IEvent>("Event", EventSchema);
