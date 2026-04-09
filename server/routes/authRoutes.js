const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const { loginLimiter } = require("../middleware/rateLimiter");
const { validateRegister, validateLogin } = require("../middleware/validators");

router.post("/register", validateRegister, register);
router.post("/login", loginLimiter, validateLogin, login);

module.exports = router;
