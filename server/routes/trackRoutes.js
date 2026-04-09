const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const {
  trackFood,
  getTracked,
  getTrackedByDate,
} = require("../controllers/trackController");
const { validateTrackFood } = require("../middleware/validators");

router.post("/track", authMiddleware, validateTrackFood, trackFood);
router.get("/track/:userId", authMiddleware, getTracked);
router.get("/track/:userId/:date", authMiddleware, getTrackedByDate);

module.exports = router;
