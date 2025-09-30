import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoute.js";
import activityRoutes from "./routes/activityRoute.js";
import adminRoutes from "./routes/adminRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(" MongoDB connected successfully"))
  .catch(err => console.error(" MongoDB connection error:", err));


app.use("/api/auth", authRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/admin", adminRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
