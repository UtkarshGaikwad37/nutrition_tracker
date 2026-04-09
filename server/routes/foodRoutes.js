const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const { getFoods, searchFoods } = require("../controllers/foodController");

router.get("/food", authMiddleware, getFoods);
router.get("/food/:name", authMiddleware, searchFoods);

module.exports = router;
