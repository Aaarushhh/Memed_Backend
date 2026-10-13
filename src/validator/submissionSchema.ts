import * as yup from "yup";

export const createSubmissionSchema = yup.object({
  campaignId: yup.string().required("Campaign id is required"),
  postUrl: yup.string().trim().required("Post url is required"),
});

export const updateViewsSchema = yup.object({
  views: yup
    .number()
    .min(0, "Views cannot be negative")
    .required("Views is required"),
});

