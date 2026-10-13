import * as yup from "yup";
import { Platform } from "../util/enum/common.enum";

export const createCampaignSchema = yup.object({
  name: yup.string().trim().min(2).max(120).required("Name is required"),
  platform: yup
    .mixed<Platform>()
    .oneOf(Object.values(Platform), "Platform must be Instagram or YouTube")
    .required("Platform is required"),
  totalBudget: yup
    .number()
    .positive("Total budget must be greater than 0")
    .required("Total budget is required"),
  milestones: yup
    .array()
    .of(
      yup.object({
        views: yup.number().positive().required("Views is required"),
        payout: yup.number().min(0).required("Payout is required"),
      })
    )
    .min(1, "At least one milestone is required")
    .required("Milestones are required"),
});
