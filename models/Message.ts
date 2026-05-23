import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  type: "text" | "image" | "file";
  readBy: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, maxlength: 5000 },
    type: { type: String, enum: ["text", "image", "file"], default: "text" },
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

MessageSchema.index({ conversationId: 1, createdAt: -1 });

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
