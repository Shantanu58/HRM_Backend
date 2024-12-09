const express = require("express");
const router = express.Router();
const Middleware = require("../middleware/index.js");

const {
  createDepartment,
  getAllDepartment,
  getAllDepartmentByBranchId,
} = require("../controllers/Branch-Department");

router.post("/department", Middleware, createDepartment);
router.get("/department-get-all", Middleware, getAllDepartment);
router.get(
  "/department-get-all-by-branch-id",
  Middleware,
  getAllDepartmentByBranchId
);

module.exports = router;
