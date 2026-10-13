import express from "express";
import authRoute from "./auth/authRoute";
import campaignRoute from "./campaign/campaignRoute";

const router = express.Router();

router.get("/ping", (_req, res) => {
  res.json({ success: true, message: "pong" });
});

router.use("/auth", authRoute);
router.use("/campaigns", campaignRoute);

export default router;
