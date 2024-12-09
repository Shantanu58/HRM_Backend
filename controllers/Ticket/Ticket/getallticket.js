const Ticket = require("../../../models/Ticket"); // Import the Mongoose model for Ticket

async function getAllTickets(req, res) {
    try {
        // Fetch all tickets from the database
        const tickets = await Ticket.find();

        if (!tickets.length) {
            return res.status(404).json({
                message: "No tickets found.",
                hasError: false,
            });
        }

        return res.status(200).json({
            message: "Tickets fetched successfully.",
            tickets: tickets,
            hasError: false,
        });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).json({
            message: "Failed to fetch tickets.",
            error: error.message,
            hasError: true,
        });
    }
}

module.exports = getAllTickets;
