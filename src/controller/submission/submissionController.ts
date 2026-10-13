import { RequestHandler } from "express";
import CampaignModel from "../../model/campaign.model";
import SubmissionModel from "../../model/submission.model";
import { CustomError } from "../../util/helper/customError";
import { HttpStatusCode } from "../../util/enum/common.enum";
import { ExtendedRequest } from "../../util/interface/common.interface";

class SubmissionController {
  create: RequestHandler = async (req, res, next) => {
    const { campaignId, postUrl } = req.body;
    try {
      const campaign = await CampaignModel.findOne({
        _id: campaignId,
        isLive: true,
      });
      if (!campaign) {
        return next(
          new CustomError("Live campaign not found", HttpStatusCode.NOT_FOUND)
        );
      }

      const submission = await SubmissionModel.create({
        campaignId,
        postUrl,
        creatorId: (req as ExtendedRequest).user!.userId,
      });

      res.status(HttpStatusCode.CREATED).json({
        data: {
          submission: {
            id: submission._id.toString(),
            campaignId: submission.campaignId.toString(),
            postUrl: submission.postUrl,
            views: submission.views,
            payout: submission.payout,
          },
        },
        message: "Post submitted successfully",
      });
    } catch (error) {
      console.error("Error in create:", error);
      next(
        new CustomError(
          "Unable to submit post. Please try again later.",
          HttpStatusCode.SERVICE_UNAVAILABLE
        )
      );
    }
  };

  earnings: RequestHandler = async (req: ExtendedRequest, res, next) => {
    try {
      const submissions = await SubmissionModel.find({
        creatorId: req.user!.userId,
      });

      const totalEarnings = submissions.reduce(
        (sum, submission) => sum + submission.payout,
        0
      );

      res.status(HttpStatusCode.OK).json({
        data: {
          totalEarnings,
        },
        message: "Earnings fetched successfully",
      });
    } catch (error) {
      console.error("Error in earnings:", error);
      next(
        new CustomError(
          "Unable to fetch earnings. Please try again later.",
          HttpStatusCode.SERVICE_UNAVAILABLE
        )
      );
    }
  };
}

export default new SubmissionController();
