const mongoose = require("mongoose");

const trackerSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foods",
      required: true,
    },
    details: {
      calories: Number,
      protein: Number,
      carbohydrates: Number,
      fat: Number,
      fiber: Number,
    },
    eatenAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

trackerSchema.index({ userId: 1, eatenAt: -1 });

const trackerModel = mongoose.model("trackers", trackerSchema);

module.exports = trackerModel;
