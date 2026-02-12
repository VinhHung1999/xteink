import dotenv from "dotenv";
dotenv.config();

const corsRaw = process.env.CORS_ORIGIN || "http://localhost:2002";
const corsOrigin = corsRaw.includes(",") ? corsRaw.split(",").map((s) => s.trim()) : corsRaw;

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  corsOrigin,
  nodeEnv: process.env.NODE_ENV || "development",
};
