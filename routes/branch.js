const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createBranch,
  getAllBranch,
} = require("../Controllers/Branch-Department");

router.post("/branch", Middleware, createBranch);
router.get("/branch-get-all", Middleware, getAllBranch);

module.exports = router;
