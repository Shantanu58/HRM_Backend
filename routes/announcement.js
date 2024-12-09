const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createAnnouncement,
  getAllAnnouncement,
} = require("../controllers/Dashboard");

// Define routes
router.post("/announcement", Middleware, createAnnouncement);
router.get("/announcement-get-all", Middleware, getAllAnnouncement);

module.exports = router;
