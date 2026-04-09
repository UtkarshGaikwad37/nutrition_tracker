const foodModel = require("../Models/foodModel");

const getFoods = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.json(foods);
  } catch (error) {
    console.error("Food Retrieval Error:", error);
    res.status(500).json({ message: "Food is not available" });
  }
};

const searchFoods = async (req, res) => {
  try {
    const { name } = req.params;
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const foods = await foodModel.find({
      name: { $regex: escapedName, $options: "i" },
    });
    res.json(foods);
  } catch (error) {
    console.error("Food Search Error:", error);
    res.status(500).json({ message: "Food is not available" });
  }
};

module.exports = { getFoods, searchFoods };
