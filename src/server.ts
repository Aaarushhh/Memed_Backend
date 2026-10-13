import "dotenv/config";
import express from "express";
import cors from "cors";
import config from "./config/index";
import router from "./routes/index";
import connectToMongoDB from "./lib/mongoose";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: config.commonConfig.corsOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

connectToMongoDB();

app.use("/api", router);
app.use(errorHandler);

app.listen(config.commonConfig.port as number, "0.0.0.0", () => {
  console.log(`Server is running on port ${config.commonConfig.port}`);
});
