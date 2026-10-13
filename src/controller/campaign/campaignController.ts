import { RequestHandler } from "express";
import CampaignModel from "../../model/campaign.model";
import { CustomError } from "../../util/helper/customError";
import { HttpStatusCode } from "../../util/enum/common.enum";
import { ExtendedRequest } from "../../util/interface/common.interface";

class CampaignController {
  create: RequestHandler = async (req, res, next) => {
    const { name, platform, totalBudget, milestones } = req.body;
    try {
      const campaign = await CampaignModel.create({
        name,
        platform,
        totalBudget,
        milestones,
        brandId: (req as ExtendedRequest).user!.userId,
      });

      res.status(HttpStatusCode.CREATED).json({
        data: {
          campaign: {
            id: campaign._id.toString(),
            name: campaign.name,
            platform: campaign.platform,
            totalBudget: campaign.totalBudget,
            milestones: campaign.milestones,
            budgetSpent: campaign.budgetSpent,
            budgetRemaining: campaign.totalBudget - campaign.budgetSpent,
            isLive: campaign.isLive,
          },
        },
        message: "Campaign created successfully",
      });
    } catch (error) {
      console.error("Error in create:", error);
      next(
        new CustomError(
          "Unable to create campaign. Please try again later.",
          HttpStatusCode.SERVICE_UNAVAILABLE
        )
      );
    }
  };

  list: RequestHandler = async (req: ExtendedRequest, res, next) => {
    try {
      const campaigns = await CampaignModel.find({
        brandId: req.user!.userId,
      });

      res.status(HttpStatusCode.OK).json({
        data: {
          campaigns: campaigns.map((campaign) => ({
            id: campaign._id.toString(),
            name: campaign.name,
            platform: campaign.platform,
            totalBudget: campaign.totalBudget,
            milestones: campaign.milestones,
            budgetSpent: campaign.budgetSpent,
            budgetRemaining: campaign.totalBudget - campaign.budgetSpent,
            isLive: campaign.isLive,
          })),
        },
        message: "Campaigns fetched successfully",
      });
    } catch (error) {
      console.error("Error in list:", error);
      next(
        new CustomError(
          "Unable to fetch campaigns. Please try again later.",
          HttpStatusCode.SERVICE_UNAVAILABLE
        )
      );
    }
  };

  listLive: RequestHandler = async (req, res, next) => {
    try {
      const campaigns = await CampaignModel.find({ isLive: true });

      res.status(HttpStatusCode.OK).json({
        data: {
          campaigns: campaigns.map((campaign) => ({
            id: campaign._id.toString(),
            name: campaign.name,
            platform: campaign.platform,
            totalBudget: campaign.totalBudget,
            milestones: campaign.milestones,
            budgetSpent: campaign.budgetSpent,
            budgetRemaining: campaign.totalBudget - campaign.budgetSpent,
            isLive: campaign.isLive,
          })),
        },
        message: "Live campaigns fetched successfully",
      });
    } catch (error) {
      console.error("Error in listLive:", error);
      next(
        new CustomError(
          "Unable to fetch live campaigns. Please try again later.",
          HttpStatusCode.SERVICE_UNAVAILABLE
        )
      );
    }
  };
}

export default new CampaignController();
