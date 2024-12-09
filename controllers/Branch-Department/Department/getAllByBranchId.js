const Department = require("../../../models/Department");
const Branch = require("../../../models/Branch");

async function getAllByBranchId(req, res) {
  const { branchId } = req.query;
  try {
    // If no branchId is provided, return all branches
    const branches = await Branch.find();

    if (!branchId) {
      return res.status(200).json({ hasError: false, data: branches });
    }

    // Fetch departments based on the selected branch
    const departments = await Department.find({ branchId });

    // Return both the branches and departments if needed
    return res.status(200).json({
      hasError: false,
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching branches and departments:", error);
    return res.status(500).json({
      message: "Failed to fetch branches and departments",
      error: error.message,
    });
  }
}
module.exports = getAllByBranchId;
