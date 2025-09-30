import mongoose from "mongoose";

import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    buttonClicked: {
      type: String,
      enum: ["Button A", "Button B"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
);

activityLogSchema.plugin(aggregatePaginate)

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
