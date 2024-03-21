import mongoose, { Schema, models } from "mongoose";

const calendarSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace" },
    taskId: { type: Schema.Types.ObjectId, ref: "task" },
  },
  { timestamps: true }
);

const Calendar = models.Calendar || mongoose.model("Calendar", calendarSchema);
export default Calendar;
