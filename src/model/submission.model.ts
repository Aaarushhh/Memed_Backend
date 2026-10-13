import mongoose, { Schema } from "mongoose";
import { ISubmission } from "../util/interface/submission.interface";

const submissionSchema = new Schema<ISubmission>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postUrl: {
      type: String,
      required: true,
      trim: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    payout: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const SubmissionModel = mongoose.model<ISubmission>(
  "Submission",
  submissionSchema
);

export default SubmissionModel;
