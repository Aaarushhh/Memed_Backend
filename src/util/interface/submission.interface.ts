import { Document, Types } from "mongoose";

export interface ISubmission extends Document {
  campaignId: Types.ObjectId;
  creatorId: Types.ObjectId;
  postUrl: string;
  views: number;
  payout: number;
  createdAt: Date;
  updatedAt: Date;
}
