import express from "express";

const router = express.Router();

router.get("/ping", (_req, res) => {
  res.json({ success: true, message: "pong" });
});

export default router;
