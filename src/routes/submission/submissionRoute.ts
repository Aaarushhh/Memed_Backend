import express from "express";
import SubmissionController from "../../controller/submission/submissionController";
import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
import { validateRequest } from "../../middleware/validateRequest";
import { UserRole } from "../../util/enum/common.enum";
import { createSubmissionSchema } from "../../validator/submissionSchema";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(UserRole.CREATOR),
  validateRequest({ schema: createSubmissionSchema }),
  SubmissionController.create
);

router.get(
  "/earnings",
  authenticate,
  authorize(UserRole.CREATOR),
  SubmissionController.earnings
);

export default router;
