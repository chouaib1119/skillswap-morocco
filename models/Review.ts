import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  reviewer: mongoose.Types.ObjectId;
  reviewee: mongoose.Types.ObjectId;
  exchangeId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  skillTaught: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    reviewer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reviewee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    exchangeId: { type: Schema.Types.ObjectId, ref: "Exchange", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 1000 },
    skillTaught: { type: String, required: true },
  },
  { timestamps: true }
);

ReviewSchema.index({ reviewee: 1 });
ReviewSchema.index({ reviewer: 1 });
ReviewSchema.index({ exchangeId: 1 });

// After saving a review, update the reviewee's average rating
ReviewSchema.post("save", async function (this: IReview) {
  const Review = mongoose.model<IReview>("Review");
  const stats = await Review.aggregate([
    { $match: { reviewee: this.reviewee } },
    { $group: { _id: "$reviewee", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);
  if (stats.length > 0) {
    await mongoose.model("User").findByIdAndUpdate(this.reviewee, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].count,
    });
  }
});

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
