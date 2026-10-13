import mongoose, { Schema } from "mongoose";
import { Platform } from "../util/enum/common.enum";
import { ICampaign } from "../util/interface/campaign.interface";

const campaignSchema = new Schema<ICampaign>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    platform: {
      type: String,
      enum: Object.values(Platform),
      required: true,
    },
    totalBudget: {
      type: Number,
      required: true,
    },
    milestones: [
      {
        views: { type: Number, required: true },
        payout: { type: Number, required: true },
      },
    ],
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    budgetSpent: {
      type: Number,
      default: 0,
    },
    isLive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CampaignModel = mongoose.model<ICampaign>("Campaign", campaignSchema);

export default CampaignModel;
