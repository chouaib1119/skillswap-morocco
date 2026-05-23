import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  level: number;
  xp: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  completedExchanges: number;
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, select: false },
    image: String,
    username: { type: String, unique: true, lowercase: true },
    bio: { type: String, maxlength: 500 },
    city: String,
    country: { type: String, default: "Morocco" },
    skillsTeach: [{ name: String, category: String, level: String, description: String }],
    skillsLearn: [{ name: String, category: String, level: String }],
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    badges: [{ id: String, name: String, description: String, icon: String, earnedAt: { type: Date, default: Date.now } }],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    socialLinks: { github: String, linkedin: String, twitter: String, website: String },
    joinedAt: { type: Date, default: Date.now },
    completedExchanges: { type: Number, default: 0 },
    languages: [String],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
