import { Document, Types } from "mongoose";
import { Platform } from "../enum/common.enum";

export interface IMilestone {
  views: number;
  payout: number;
}

export interface ICampaign extends Document {
  name: string;
  platform: Platform;
  totalBudget: number;
  milestones: IMilestone[];
  brandId: Types.ObjectId;
  budgetSpent: number;
  isLive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
