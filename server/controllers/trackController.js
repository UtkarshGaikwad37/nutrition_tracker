const trackerModel = require("../Models/trackerModel");

const trackFood = async (req, res) => {
  const { foodId, details, quantity } = req.body;
  const userId = req.user?.id;

  if (!userId || !foodId || !details || !quantity) {
    return res
      .status(400)
      .json({ message: "foodId, details, and quantity are required" });
  }

  try {
    const data = await trackerModel.create({
      userId,
      foodId,
      details,
      quantity,
    });
    res.status(201).json({ data, message: "Food added" });
  } catch (error) {
    console.error("Tracking Error:", error);
    res.status(500).json({ message: "Error tracking food" });
  }
};

const getTracked = async (req, res) => {
  if (req.user?.id !== req.params.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const data = await trackerModel
      .find({ userId: req.params.userId })
      .populate("userId")
      .populate("foodId");
    res.json(data);
  } catch (error) {
    console.error("Tracking Retrieval Error:", error);
    res.status(500).json({ message: "Error retrieving tracked data" });
  }
};

const getTrackedByDate = async (req, res) => {
  const { userId, date } = req.params;

  if (req.user?.id !== userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const requestedDate = new Date(date);
  if (Number.isNaN(requestedDate.getTime())) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  const startOfDay = new Date(requestedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(requestedDate);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const data = await trackerModel
      .find({
        userId,
        eatenAt: { $gte: startOfDay, $lte: endOfDay },
      })
      .populate("userId")
      .populate("foodId");

    res.json(data);
  } catch (error) {
    console.error("Tracking Retrieval Error:", error);
    res.status(500).json({ message: "Error retrieving tracked data" });
  }
};

module.exports = { trackFood, getTracked, getTrackedByDate };
