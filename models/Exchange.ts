import mongoose, { Schema, Document } from "mongoose";

export interface IExchange extends Document {
  requester: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  requesterSkill: { name: string; category: string; level: string };
  receiverSkill: { name: string; category: string; level: string };
  status: "pending" | "accepted" | "rejected" | "active" | "completed" | "cancelled";
  message?: string;
}

const SessionSchema = new Schema({
  date: { type: Date, required: true },
  duration: { type: Number, default: 60 },
  meetLink: String,
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
  notes: String,
});

const ExchangeSchema = new Schema<IExchange>(
  {
    requester: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    requesterSkill: {
      name: { type: String, required: true },
      category: { type: String, required: true },
      level: { type: String, required: true },
    },
    receiverSkill: {
      name: { type: String, required: true },
      category: { type: String, required: true },
      level: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "active", "completed", "cancelled"],
      default: "pending",
    },
    message: String,
    sessions: [SessionSchema],
  },
  { timestamps: true }
);

ExchangeSchema.index({ requester: 1 });
ExchangeSchema.index({ receiver: 1 });
ExchangeSchema.index({ status: 1 });

export default mongoose.models.Exchange || mongoose.model<IExchange>("Exchange", ExchangeSchema);
