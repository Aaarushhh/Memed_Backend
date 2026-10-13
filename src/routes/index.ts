import express from "express";
import authRoute from "./auth/authRoute";

const router = express.Router();

router.get("/ping", (_req, res) => {
  res.json({ success: true, message: "pong" });
});

router.use("/auth", authRoute);

export default router;
