require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const trackRoutes = require("./routes/trackRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");

connectDB();

const app = express();

/* -------------------- SECURITY MIDDLEWARE -------------------- */
app.use(helmet());
app.use(express.json());

/* -------------------- CORS CONFIG FIX -------------------- */
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests like Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS blocked: Not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

/* -------------------- RATE LIMIT -------------------- */
app.use(apiLimiter);

/* -------------------- ROUTES -------------------- */
app.use(authRoutes);
app.use(foodRoutes);
app.use(trackRoutes);

/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
  res.json({
    message: "Nutrition Tracker API is running 🚀",
  });
});

/* -------------------- 404 HANDLER -------------------- */
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
