const Ticket = require("../../../models/Ticket"); // Import the Ticket model
const TicketValidator = require("../../../validators/Ticket/TicketValidators"); // Import the Joi validator

async function updateTicket(req, res) {
  const { id } = req.params; // Extract ID from request parameters
  const { error } = TicketValidator(req.body); // Validate the incoming data

  // If validation fails, return a 400 error with validation details
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((detail) => detail.message).join(', '),
    });
  }

  const { title, employee_name, priority, description, attachment, status, end_date } = req.body;

  try {
    // Check if the ticket exists
    const existingTicket = await Ticket.findById(id);
    if (!existingTicket) {
      return res.status(404).json({
        message: 'Ticket not found',
      });
    }

    // Update the ticket record
    existingTicket.title = title || existingTicket.title;
    existingTicket.employee_name = employee_name || existingTicket.employee_name;
    existingTicket.priority = priority || existingTicket.priority;
    existingTicket.description = description || existingTicket.description;
    existingTicket.attachment = attachment || existingTicket.attachment;
    existingTicket.status = status || existingTicket.status;
    existingTicket.end_date = end_date || existingTicket.end_date;

    // Save the updated document
    const updatedTicket = await existingTicket.save();

    // Send success response
    res.status(200).json({
      message: 'Ticket updated successfully',
      data: updatedTicket,
    });
  } catch (err) {
    console.error(err);

    // Handle database or other errors
    res.status(500).json({
      message: 'An error occurred while updating the ticket',
      error: err.message,
    });
  }
}

module.exports = updateTicket; // Export updateTicket instead of updateexpense
