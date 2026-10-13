import express from "express";
import authRoute from "./auth/authRoute";
import campaignRoute from "./campaign/campaignRoute";
import submissionRoute from "./submission/submissionRoute";

const router = express.Router();

router.get("/ping", (_req, res) => {
  res.json({ success: true, message: "pong" });
});

router.use("/auth", authRoute);
router.use("/campaigns", campaignRoute);
router.use("/submissions", submissionRoute);

export default router;
