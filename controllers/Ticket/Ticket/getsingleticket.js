const Ticket = require("../../../models/Ticket"); // Import the Mongoose model for Ticket

// API to fetch a single ticket by ID
async function getTicketById(req, res) {
    try {
        // Extract ticket ID from the request parameters
        const ticketId = req.params.id;

        // Fetch the ticket from the database by ID
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found.",
                hasError: false,
            });
        }

        return res.status(200).json({
            message: "Ticket fetched successfully.",
            ticket: ticket,
            hasError: false,
        });
    } catch (error) {
        console.error("Error fetching ticket:", error);
        return res.status(500).json({
            message: "Failed to fetch ticket.",
            error: error.message,
            hasError: true,
        });
    }
}

module.exports = getTicketById;
