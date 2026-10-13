import express from "express";
import CampaignController from "../../controller/campaign/campaignController";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
import { validateRequest } from "../../middleware/validateRequest";
import { UserRole } from "../../util/enum/common.enum";
import { createCampaignSchema } from "../../validator/campaignSchema";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(UserRole.BRAND),
  validateRequest({ schema: createCampaignSchema }),
  CampaignController.create
);

router.get(
  "/",
  authenticate,
  authorize(UserRole.BRAND),
  CampaignController.list
);

export default router;
