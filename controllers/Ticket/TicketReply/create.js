const Ticket = require("../../../models/Ticket");  // Assuming Ticket model is in this path
const TicketReply = require("../../../models/TicketReply");
const TicketValidator = require("../../../validators/Ticket/TicketReplyValidators");

// Create Ticket Reply API
async function createticketreply(req, res) {
  try {
    // Validate the request body using Joi
    const { error } = TicketValidator.validate(req.body);
    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(", ");
      return res.status(400).json({
        message: `Validation error: ${errorMessages}`,
        hasError: true,
      });
    }

    // Destructure the ticket reply data from the request body
    const { description, attachment } = req.body;
    const ticketId = req.body.ticketId;  // Assuming ticketId is passed in the body

    // Validate if the ticketId exists in the Ticket collection
    const ticket = await Ticket.findById(ticketId);  // Lookup ticket by its ObjectId
    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found.",
        hasError: true,
      });
    }

    // Create a new ticket reply object
    const newTicketReply = new TicketReply({
      ticketId: ticket._id,  // Use the ticket's ObjectId for the reference
      description,
      attachment,
    });

    // Save the new ticket reply
    await newTicketReply.save();

    return res.status(201).json({
      message: "Ticket reply created successfully.",
      ticketReply: newTicketReply,
      hasError: false,
    });
  } catch (error) {
    console.error("Error creating ticket reply:", error);
    return res.status(500).json({
      message: "Internal server error. Failed to create ticket reply.",
      error: error.message || error,
      hasError: true,
    });
  }
}

module.exports = createticketreply;
