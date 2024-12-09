const Ticket = require('../../../models/Ticket');  // Import the Mongoose model for Ticket

// Delete a ticket by ID
async function deleteTicket(req, res) {
  const { id } = req.params; // Get the ticket ID from the request parameters

  try {
    // Find and delete the ticket by ID
    const deletedTicket = await Ticket.findByIdAndDelete(id);

    // If no ticket is found, return a 404 response
    if (!deletedTicket) {
      return res.status(404).json({
        message: 'Ticket not found',
      });
    }

    // Send success response
    res.status(200).json({
      message: 'Ticket deleted successfully',
      data: deletedTicket, // Include the deleted ticket data if needed
    });
  } catch (error) {
    console.error(error);

    // Generic server error response
    res.status(500).json({
      message: 'An error occurred while deleting the Ticket',
      error: error.message,
    });
  }
}

module.exports = deleteTicket; // Export the delete function
