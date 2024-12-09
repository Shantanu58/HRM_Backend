const Branch = require("../../../models/Branch");

async function getAll(req, res) {
  try {
    // Fetch all branches
    const branches = await Branch.find();

    if (branches.length === 0) {
      return res.status(404).json({
        hasError: true,
        message: "No Branch found",
      });
    }

    return res.status(200).json({
      hasError: false,
      message: "Branches fetched successfully",
      data: branches,
    });
  } catch (error) {
    console.error("Error fetching branches:", error.message);
    return res.status(500).json({
      hasError: true,
      message: "Server error",
    });
  }
}

module.exports = getAll;
