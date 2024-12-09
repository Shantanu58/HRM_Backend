const Payroll = require('../../../models/Payroll');
// Get a single payroll record by ID
async function getsingle(req, res)  {
  const { id } = req.params;

  try {
    const payroll = await Payroll.findById(id)
      .populate('employeeId', 'name')  // Populate employee name from Employee collection
      .exec();

    if (!payroll) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }

    res.status(200).json({ data: payroll });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the payroll record' });
  }
};

module.exports=getsingle;
