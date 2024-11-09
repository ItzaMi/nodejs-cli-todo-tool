import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["in progress", "complete", "to do"],
      default: "to do",
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", TodoSchema);
